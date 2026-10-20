import { z } from "zod";

/**
 * Esquemas de validación COMPARTIDOS.
 * - El cliente los usa para dar feedback inmediato (UX).
 * - El servidor DEBE volver a usarlos (seguridad): el cliente se puede saltar.
 */

const email = z
  .string()
  .trim()
  .min(1, "Escribe tu correo.")
  .max(254, "El correo es demasiado largo.")
  .pipe(z.email("Escribe un correo válido."));

// El máximo de 72 caracteres existe porque bcrypt (que usa Supabase) ignora lo que pase de 72 bytes.
const password = z
  .string()
  .min(8, "Usa al menos 8 caracteres.")
  .max(72, "Usa como máximo 72 caracteres.")
  .regex(/[a-z]/, "Incluye una letra minúscula.")
  .regex(/[A-Z]/, "Incluye una letra mayúscula.")
  .regex(/\d/, "Incluye un número.");

export const PASSWORD_HINT = "Mínimo 8 caracteres, con mayúscula, minúscula y número.";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Escribe tu nombre.")
      .max(80, "El nombre es demasiado largo."),
    email,
    password,
    confirmPassword: z.string().min(1, "Repite tu contraseña."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden.",
  });

export const loginSchema = z.object({
  email,
  // En login no aplicamos las reglas de complejidad: solo que no esté vacía.
  password: z.string().min(1, "Escribe tu contraseña.").max(72),
});

export const forgotPasswordSchema = z.object({ email });

export const updatePasswordSchema = z
  .object({
    password,
    confirmPassword: z.string().min(1, "Repite tu contraseña."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden.",
  });

/** Convierte un error de Zod en { campo: [mensajes] } para pintarlo en el formulario. */
export function fieldErrorsFrom(error: z.ZodError): Record<string, string[] | undefined> {
  return z.flattenError(error).fieldErrors;
}
