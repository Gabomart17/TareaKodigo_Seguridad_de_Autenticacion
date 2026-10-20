"use client";

import { useState, type FormEvent } from "react";
import type { ZodType } from "zod";
import type { FieldErrors } from "@/lib/auth/types";
import { fieldErrorsFrom } from "@/lib/validations/auth";

/**
 * Validación en el CLIENTE (solo para dar feedback rápido).
 * Si algo falla, cancelamos el envío. Si todo está bien, dejamos que el formulario
 * llegue a la Server Action, que valida OTRA VEZ en el servidor.
 */
export function useClientValidation(schema: ZodType) {
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      event.preventDefault();
      setClientErrors(fieldErrorsFrom(result.error));
      return;
    }
    setClientErrors({});
  }

  return { clientErrors, onSubmit };
}
