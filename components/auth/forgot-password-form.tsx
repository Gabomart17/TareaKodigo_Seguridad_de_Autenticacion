"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/lib/auth/actions";
import { initialAuthState, type FieldErrors } from "@/lib/auth/types";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { Alert } from "@/components/ui/alert";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";
import { useClientValidation } from "@/components/auth/use-client-validation";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(requestPasswordReset, initialAuthState);
  const { clientErrors, onSubmit } = useClientValidation(forgotPasswordSchema);
  const errors: FieldErrors = { ...state.fieldErrors, ...clientErrors };

  if (state.ok) {
    return <Alert tone="success">{state.message}</Alert>;
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="space-y-5">
      {state.message && <Alert tone="error">{state.message}</Alert>}
      <Field
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={errors.email?.[0]}
      />
      <SubmitButton pendingText="Enviando…">Enviar enlace</SubmitButton>
    </form>
  );
}
