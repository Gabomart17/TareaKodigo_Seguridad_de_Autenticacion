"use client";

import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { btnPrimary } from "@/components/ui/styles";

type SubmitButtonProps = { children: ReactNode; pendingText: string; className?: string };

/** Botón que se deshabilita mientras la Server Action está en curso (evita dobles envíos). */
export function SubmitButton({ children, pendingText, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${btnPrimary} w-full ${className ?? ""}`}>
      {pending ? (
        <>
          <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />
          {pendingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
