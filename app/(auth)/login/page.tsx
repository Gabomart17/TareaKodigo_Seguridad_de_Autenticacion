import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Alert } from "@/components/ui/alert";
import { getNotice } from "@/lib/auth/messages";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ aviso?: string }>;
}) {
  const { aviso } = await searchParams;
  const notice = getNotice(aviso);

  return (
    <>
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>
      <p className="mt-1 text-muted">Entra a tu espacio privado.</p>
      {notice && (
        <div className="mt-5">
          <Alert tone={notice.tone}>{notice.text}</Alert>
        </div>
      )}
      <div className="mt-6">
        <LoginForm />
      </div>
      <p className="mt-6 text-sm text-muted">
        ¿Aún no tienes cuenta?{" "}
        <Link href="/register" className="font-medium text-brand underline underline-offset-4">
          Crea una
        </Link>
      </p>
    </>
  );
}
