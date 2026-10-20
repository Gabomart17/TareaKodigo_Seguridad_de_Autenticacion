"use client";

import { useActionState } from "react";
import { signUp } from "@/lib/auth/actions";
import { initialAuthState, type FieldErrors } from "@/lib/auth/types";
import { PASSWORD_HINT, registerSchema } from "@/lib/validations/auth";
import { Alert } from "@/components/ui/alert";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";
import { useClientValidation } from "@/components/auth/use-client-validation";

export function RegisterForm() {
  const [state, formAction] = useActionState(signUp, initialAuthState);
  const { clientErrors, onSubmit } = useClientValidation(registerSchema);
  const errors: FieldErrors = { ...state.fieldErrors, ...clientErrors };

  if (state.ok) {
    return <Alert tone="success">{state.message ?? "Cuenta creada. Revisa tu correo para verificarla."}</Alert>;
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="space-y-5">
      {state.message && <Alert tone="error">{state.message}</Alert>}
      <Field
        label="Nombre"
        name="fullName"
        autoComplete="name"
        defaultValue={state.values?.fullName}
        error={errors.fullName?.[0]}
      />
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
        autoComplete="new-password"
        hint={PASSWORD_HINT}
        error={errors.password?.[0]}
      />
      <Field
        label="Repite la contraseña"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.[0]}
      />
      <SubmitButton pendingText="Creando cuenta…">Crear cuenta</SubmitButton>
    </form>
  );
}
