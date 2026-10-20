import type { CookieOptions } from "@supabase/ssr";


export const secureCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} satisfies CookieOptions;