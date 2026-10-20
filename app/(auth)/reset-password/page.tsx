import type { Metadata } from "next";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";

export const metadata: Metadata = { title: "Nueva contraseña" };

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Crea tu nueva contraseña</h1>
      <p className="mt-1 text-muted">Elige una contraseña que no uses en otros sitios.</p>
      <div className="mt-6">
        <UpdatePasswordForm />
      </div>
    </>
  );
}
