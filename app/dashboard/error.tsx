"use client";

import { btnPrimary } from "@/components/ui/styles";


export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="rounded-lg border border-line bg-surface p-6">
      <h2 className="text-xl font-bold">No pudimos cargar esta sección</h2>
      <p className="mt-2 text-muted">Ocurrió un problema de nuestro lado. Inténtalo de nuevo en un momento.</p>
      <button type="button" onClick={reset} className={`${btnPrimary} mt-4`}>
        Reintentar
      </button>
    </div>
  );
}
