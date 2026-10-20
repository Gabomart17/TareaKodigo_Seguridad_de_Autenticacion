import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth/actions";
import { btnSecondary } from "@/components/ui/styles";

/**
 * Cerrar sesión es una MUTACIÓN: se hace con un <form> que llama a una Server Action (POST),
 * nunca con un enlace <a href="/logout"> (un GET podría dispararse desde otra página).
 */
export function SignOutButton({ className }: { className?: string }) {
  return (
    <form action={signOut}>
      <button type="submit" className={`${btnSecondary} ${className ?? ""}`}>
        <LogOut aria-hidden className="size-4" />
        Cerrar sesión
      </button>
    </form>
  );
}
