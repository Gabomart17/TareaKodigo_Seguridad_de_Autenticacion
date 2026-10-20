"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "@/lib/auth/actions";
import { initialAuthState, type FieldErrors } from "@/lib/auth/types";
import { loginSchema } from "@/lib/validations/auth";
import { Alert } from "@/components/ui/alert";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";
import { useClientValidation } from "@/components/auth/use-client-validation";

export function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialAuthState);
  const { clientErrors, onSubmit } = useClientValidation(loginSchema);
  const errors: FieldErrors = { ...state.fieldErrors, ...clientErrors };

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="space-y-5">
      {state.message && <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>}
      <Field
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={errors.email?.[0]}
      />
      <Field
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.[0]}
      />
      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm font-medium text-brand underline underline-offset-4">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <SubmitButton pendingText="Entrando…">Iniciar sesión</SubmitButton>
    </form>
  );
}
