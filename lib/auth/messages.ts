
export const NOTICES = {
  "cuenta-creada": {
    tone: "success",
    text: "Cuenta creada. Revisa tu correo para verificarla.",
  },
  "contrasena-actualizada": {
    tone: "success",
    text: "Tu contraseña se actualizó. Ya puedes iniciar sesión.",
  },
  "enlace-invalido": {
    tone: "error",
    text: "El enlace no es válido o ya venció. Solicita uno nuevo.",
  },
  "sesion-expirada": {
    tone: "error",
    text: "Tu sesión terminó. Inicia sesión de nuevo para continuar.",
  },
} as const;

export type NoticeCode = keyof typeof NOTICES;

export function getNotice(code: string | undefined) {
  if (!code) return null;
  return Object.hasOwn(NOTICES, code) ? NOTICES[code as NoticeCode] : null;
}
