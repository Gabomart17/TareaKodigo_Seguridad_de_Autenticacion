import type { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard-nav";
  import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";


export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
const user = await getCurrentUser();
if (!user) redirect("/login");
  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <DashboardNav />
      <div className="pt-8">{children}</div>
    </div>
  );
}
