import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES: EmailOtpType[] = ["signup", "email", "recovery"];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (tokenHash && type && ALLOWED_TYPES.includes(type)) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

    if (!error) {
      // Destinos FIJOS: nunca redirigimos a una URL que venga de la petición (open redirect).
      redirect(type === "recovery" ? "/reset-password" : "/dashboard");
    }
    console.error("[auth/confirm]", error.code ?? error.message);
  }

  redirect("/login?aviso=enlace-invalido");
}