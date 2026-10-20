"use client";

import { useActionState } from "react";
import { updatePassword } from "@/lib/auth/actions";
import { initialAuthState, type FieldErrors } from "@/lib/auth/types";
import { PASSWORD_HINT, updatePasswordSchema } from "@/lib/validations/auth";
import { Alert } from "@/components/ui/alert";
import { Field } from "@/components/ui/field";
import { SubmitButton } from "@/components/ui/submit-button";
import { useClientValidation } from "@/components/auth/use-client-validation";

/** Se usa en /reset-password (después del correo) y en "Mi cuenta" (usuario con sesión). */
export function UpdatePasswordForm({ submitLabel = "Guardar contraseña" }: { submitLabel?: string }) {
  const [state, formAction] = useActionState(updatePassword, initialAuthState);
  const { clientErrors, onSubmit } = useClientValidation(updatePasswordSchema);
  const errors: FieldErrors = { ...state.fieldErrors, ...clientErrors };

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="space-y-5">
      {state.message && <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>}
      <Field
        label="Nueva contraseña"
        name="password"
        type="password"
        autoComplete="new-password"
        hint={PASSWORD_HINT}
        error={errors.password?.[0]}
      />
      <Field
        label="Repite la nueva contraseña"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.[0]}
      />
      <SubmitButton pendingText="Guardando…">{submitLabel}</SubmitButton>
    </form>
  );
}
