"use server";
import { siteConfig } from "@/lib/site";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AuthFormState } from "@/lib/auth/types";
import { createClient } from "@/lib/supabase/server";
import {
  fieldErrorsFrom,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  updatePasswordSchema,
} from "@/lib/validations/auth";

/** Toma solo valores de texto de campos NO sensibles, para re-poblar el formulario. */
function safeValues(formData: FormData, keys: string[]): Record<string, string> {
  const values: Record<string, string> = {};
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === "string") values[key] = value;
  }
  return values;
}

export async function signUp(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const values = safeValues(formData, ["fullName", "email"]);

 
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error), values };
  }
  const { fullName, email, password } = parsed.data;

  // 2) Crear el cliente y llamar a Supabase (aquí nace supabase)
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${siteConfig.url}/auth/confirm?next=/dashboard`,
    },
  });

  
  if (error) {
    console.error("[signUp]", error.code ?? error.message);
    if (error.code === "weak_password") {
      return { ok: false, fieldErrors: { password: ["Esa contraseña es demasiado débil."] }, values };
    }
    return { ok: false, message: "No pudimos crear la cuenta. Revisa los datos e inténtalo de nuevo.", values };
  }

  
  return { ok: true, message: "Te enviamos un correo para verificar tu cuenta. Ábrelo y sigue el enlace." };
}
export async function signIn(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const values = safeValues(formData, ["email"]);

  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error), values };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    console.error("[signIn]", error.code ?? error.message);
    if (error.code === "email_not_confirmed") {
      return { ok: false, message: "Verifica tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.", values };
    }
    
    return { ok: false, message: "Correo o contraseña incorrectos.", values };
  }

  revalidatePath("/", "layout"); 
  redirect("/dashboard"); 
}

export async function requestPasswordReset(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const values = safeValues(formData, ["email"]);

  
  const parsed = forgotPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error), values };
  }

 
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${siteConfig.url}/auth/confirm?next=/reset-password`,
  });

 
  if (error) console.error("[requestPasswordReset]", error.code ?? error.message);

  
  return { ok: true, message: "Si ese correo tiene una cuenta, recibirás un enlace en unos minutos." };
}

export async function updatePassword(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = updatePasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: fieldErrorsFrom(parsed.error) };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { ok: false, message: "Tu sesión venció. Solicita un nuevo enlace para continuar." };
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    console.error("[updatePassword]", error.code ?? error.message);
    if (error.code === "same_password") {
      return { ok: false, fieldErrors: { password: ["Elige una contraseña distinta a la actual."] } };
    }
    return { ok: false, message: "No pudimos actualizar la contraseña. Inténtalo de nuevo." };
  }

  return { ok: true, message: "Tu contraseña se actualizó." };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  
  await supabase.auth.signOut({ scope: "local" });
  revalidatePath("/", "layout");
  redirect("/login");
}