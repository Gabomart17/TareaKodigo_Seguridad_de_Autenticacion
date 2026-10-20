export type FieldErrors = Record<string, string[] | undefined>;


export type AuthFormState = {
  ok: boolean;
  
  message?: string;
  
  fieldErrors?: FieldErrors;
 
  values?: Record<string, string>;
};

export const initialAuthState: AuthFormState = { ok: false };

/** Datos del usuario que la interfaz necesita (no expone tokens). */
export type AppUser = {
  id: string;
  email: string;
  fullName: string | null;
  emailVerified: boolean;
  createdAt: string;
  lastSignInAt: string | null;
};
