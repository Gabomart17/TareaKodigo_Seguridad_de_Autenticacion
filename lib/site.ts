export const siteConfig = {
  name: "Resguardo",
  description:
    "Un espacio privado para tus notas y documentos. Tu sesión se guarda en una cookie que el navegador protege y ningún script puede leer.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
