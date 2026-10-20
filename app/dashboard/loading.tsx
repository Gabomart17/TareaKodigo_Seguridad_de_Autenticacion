export default function DashboardLoading() {
  return (
    <div role="status" aria-live="polite" className="animate-pulse space-y-4 motion-reduce:animate-none">
      <span className="sr-only">Cargando…</span>
      <div className="h-8 w-64 rounded bg-line" />
      <div className="h-24 rounded bg-line" />
      <div className="h-40 rounded bg-line" />
    </div>
  );
}
