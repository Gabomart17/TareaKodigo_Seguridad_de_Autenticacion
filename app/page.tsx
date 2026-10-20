import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { btnPrimary, btnSecondary } from "@/components/ui/styles";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const cookieFlags = [
  { name: "HttpOnly", value: "Sí", meaning: "Ningún script de la página puede leerla, ni siquiera uno malicioso." },
  { name: "Secure", value: "Sí", meaning: "Solo viaja por conexiones HTTPS cifradas." },
  { name: "SameSite", value: "Lax", meaning: "No se envía cuando otro sitio intenta actuar por ti." },
];

const protections = [
  {
    title: "Tu sesión no está al alcance de scripts",
    text: "El navegador guarda la sesión en una cookie que JavaScript no puede leer. Si alguien logra inyectar código, no encuentra tu sesión.",
  },
  {
    title: "El servidor verifica cada visita",
    text: "Antes de mostrarte algo privado, el servidor comprueba que tu sesión sea real. No confiamos en lo que diga el navegador.",
  },
  {
    title: "Las páginas privadas están cerradas",
    text: "Si no has iniciado sesión, ni el dashboard ni tu cuenta se abren. Te llevamos directo al inicio de sesión.",
  },
];

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <>
      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-16 md:grid-cols-[1.1fr_1fr] md:items-center md:py-24">
        <div>
          <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl">
            Guarda lo tuyo donde solo tú puedes entrar.
          </h1>
          <p className="mt-5 max-w-prose text-lg text-muted">{siteConfig.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {user ? (
              <Link href="/dashboard" className={btnPrimary}>
                Ir a mi dashboard
              </Link>
            ) : (
              <>
                <Link href="/register" className={btnPrimary}>
                  Crear mi cuenta
                </Link>
                <Link href="/login" className={btnSecondary}>
                  Ya tengo cuenta
                </Link>
              </>
            )}
          </div>
        </div>

        <aside aria-label="Ejemplo de cookie de sesión" className="rounded-lg border border-line bg-surface p-6">
          <p className="font-display text-base font-semibold">Así se guarda tu sesión</p>
          <p className="mt-1 break-all font-mono text-sm text-muted">sb-…-auth-token</p>
          <dl className="mt-5 divide-y divide-line border-t border-line">
            {cookieFlags.map((flag) => (
              <div key={flag.name} className="py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-sm font-medium">{flag.name}</dt>
                  <dd className="text-sm font-semibold text-ok">{flag.value}</dd>
                </div>
                <p className="mt-1 text-sm text-muted">{flag.meaning}</p>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">Cómo protegemos tu cuenta</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {protections.map((item) => (
              <div key={item.title} className="border-l-2 border-brand pl-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-5xl px-5 py-6 text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Proyecto académico de seguridad web.
        </p>
      </footer>
    </>
  );
}
