import Link from "next/link";
import { btnPrimary } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-5 py-24">
      <h1 className="text-3xl font-bold">No encontramos esa página</h1>
      <p className="mt-2 text-muted">Puede que el enlace esté mal escrito o que ya no exista.</p>
      <Link href="/" className={`${btnPrimary} mt-6`}>
        Volver al inicio
      </Link>
    </div>
  );
}
