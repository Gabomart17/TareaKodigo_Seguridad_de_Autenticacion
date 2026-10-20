import type { Metadata } from "next";

// Las páginas de acceso no deben aparecer en Google: no aportan valor de búsqueda.
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-57px)] max-w-md flex-col justify-center px-5 py-12">
      <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">{children}</div>
    </div>
  );
}
