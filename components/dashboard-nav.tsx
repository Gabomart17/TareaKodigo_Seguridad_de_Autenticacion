"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Resumen" },
  { href: "/dashboard/account", label: "Mi cuenta" },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Secciones del dashboard" className="flex gap-6 border-b border-line">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px border-b-2 py-3 text-sm font-medium ${
              active ? "border-brand text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
