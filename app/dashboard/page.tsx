import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Dashboard" };

const stats = [
  { label: "Notas guardadas", value: "12" },
  { label: "Documentos", value: "4" },
  { label: "Espacio usado", value: "38 MB" },
];

const activity = [
  { text: "Creaste la nota «Ideas para el proyecto final»", when: "Hoy, 9:12" },
  { text: "Subiste el documento «Resumen de clase.pdf»", when: "Ayer, 18:40" },
  { text: "Editaste la nota «Lista de lecturas»", when: "17 sep" },
  { text: "Iniciaste sesión desde un nuevo dispositivo", when: "15 sep" },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const firstName = user?.fullName?.split(" ")[0] ?? "de nuevo";

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Hola, {firstName}</h1>
        <p className="mt-1 text-muted">Esto es lo que hay en tu espacio.</p>
      </div>

      <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface p-5">
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="mt-1 font-display text-3xl font-bold">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="actividad">
        <h2 id="actividad" className="text-xl font-bold">
          Actividad reciente
        </h2>
        <ul className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface">
          {activity.map((item) => (
            <li key={item.text} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3.5">
              <span>{item.text}</span>
              <span className="text-sm text-muted">{item.when}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">Datos de ejemplo para la demostración.</p>
      </section>
    </div>
  );
}
