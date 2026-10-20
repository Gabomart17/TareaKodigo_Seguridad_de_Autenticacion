import type { Metadata } from "next";
import { BadgeCheck, TriangleAlert } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Mi cuenta" };

const dateFormat = new Intl.DateTimeFormat("es", { dateStyle: "long", timeZone: "UTC" });
const dateTimeFormat = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
  timeZoneName: "short",
});

export default async function AccountPage() {
  const user = await getCurrentUser();

  // Si llegamos aquí sin usuario es un error de configuración de seguridad (ver Paso 5 y 7).
  if (!user) return null;

  const rows = [
    { label: "Nombre", value: user.fullName ?? "Sin nombre" },
    { label: "Correo", value: user.email },
    { label: "Miembro desde", value: dateFormat.format(new Date(user.createdAt)) },
    {
      label: "Último acceso",
      value: user.lastSignInAt ? dateTimeFormat.format(new Date(user.lastSignInAt)) : "—",
    },
  ];

  return (
    <div className="max-w-2xl space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Mi cuenta</h1>
        <p className="mt-1 text-muted">Tus datos y la seguridad de tu acceso.</p>
      </div>

      <section aria-labelledby="perfil">
        <h2 id="perfil" className="text-xl font-bold">
          Perfil
        </h2>
        <dl className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-sm text-muted">{row.label}</dt>
              <dd className="break-words">{row.value}</dd>
            </div>
          ))}
          <div className="grid gap-1 px-5 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="text-sm text-muted">Verificación</dt>
            <dd>
              {user.emailVerified ? (
                <span className="inline-flex items-center gap-1.5 text-ok">
                  <BadgeCheck aria-hidden className="size-4" /> Correo verificado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-warn">
                  <TriangleAlert aria-hidden className="size-4" /> Correo sin verificar
                </span>
              )}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="password">
        <h2 id="password" className="text-xl font-bold">
          Cambiar contraseña
        </h2>
        <p className="mt-1 text-muted">Te recomendamos una contraseña que no uses en otros sitios.</p>
        <div className="mt-5 max-w-md">
          <UpdatePasswordForm submitLabel="Actualizar contraseña" />
        </div>
      </section>

      <section aria-labelledby="sesion">
        <h2 id="sesion" className="text-xl font-bold">
          Sesión
        </h2>
        <p className="mt-1 text-muted">Cierra sesión si estás en un equipo compartido.</p>
        <div className="mt-4">
          <SignOutButton />
        </div>
      </section>
    </div>
  );
}
