import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { AppUser } from "@/lib/auth/types";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { btnPrimary } from "@/components/ui/styles";
import { siteConfig } from "@/lib/site";

const linkClass = "rounded-md px-3 py-2 text-sm font-medium text-muted hover:text-ink";

/** Navegación condicional: cambia según haya o no un usuario autenticado. */
export function Navbar({ user }: { user: AppUser | null }) {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <ShieldCheck aria-hidden className="size-5 text-brand" />
          {siteConfig.name}
        </Link>

        <nav aria-label="Principal" className="flex flex-wrap items-center gap-1">
          {user ? (
            <>
              <Link href="/dashboard" className={linkClass}>
                Dashboard
              </Link>
              <Link href="/dashboard/account" className={linkClass}>
                Mi cuenta
              </Link>
              <span className="mx-2 hidden h-5 w-px bg-line sm:block" aria-hidden />
              <span className="hidden max-w-48 truncate text-sm text-muted md:block" title={user.email}>
                {user.email}
              </span>
              <SignOutButton className="ml-1 py-2" />
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass}>
                Iniciar sesión
              </Link>
              <Link href="/register" className={`${btnPrimary} ml-1 py-2`}>
                Crear cuenta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
