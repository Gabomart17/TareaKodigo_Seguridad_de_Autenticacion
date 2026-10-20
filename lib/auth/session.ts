import { cache } from "react";
import type { AppUser } from "@/lib/auth/types";
import { createClient } from "@/lib/supabase/server";


export const getCurrentUser = cache(async (): Promise<AppUser | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const user = data.user;
  const fullName = user.user_metadata?.full_name;

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: typeof fullName === "string" ? fullName : null,
    emailVerified: Boolean(user.email_confirmed_at),
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at ?? null,
  };
});