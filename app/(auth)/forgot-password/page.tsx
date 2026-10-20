import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = { title: "Recuperar contraseña" };

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
      <p className="mt-1 text-muted">Escribe tu correo y te enviaremos un enlace para crear una nueva.</p>
      <div className="mt-6">
        <ForgotPasswordForm />
      </div>
      <p className="mt-6 text-sm text-muted">
        <Link href="/login" className="font-medium text-brand underline underline-offset-4">
          Volver a iniciar sesión
        </Link>
      </p>
    </>
  );
}
