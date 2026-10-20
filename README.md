# Resguardo

Aplicación web con autenticación segura construida con **Next.js 16 (App Router)**, **Supabase** y **TypeScript**. Proyecto académico enfocado en seguridad web: cookies `httpOnly`, protección contra XSS y CSRF, Server Actions y rutas protegidas con proxy (middleware).

## Stack

| Tecnología                 | Uso                                                      |
| -------------------------- | -------------------------------------------------------- |
| Next.js 16 (App Router)    | Framework, Server Components, Server Actions, `proxy.ts` |
| Supabase (Auth + Database) | Autenticación y base de datos con RLS                    |
| `@supabase/ssr`            | Manejo de sesión por cookies en el servidor              |
| TypeScript                 | Tipado completo                                          |
| Zod                        | Validación compartida cliente/servidor                   |
| Tailwind CSS 4             | Estilos                                                  |

## Funcionalidades

- Registro con validación (cliente y servidor) y verificación de correo
- Inicio y cierre de sesión
- Recuperación y cambio de contraseña
- Dashboard y página «Mi cuenta» (rutas privadas)
- Navegación condicional según el estado de autenticación
- SEO básico: metadata, `robots.txt`, `sitemap.xml`, áreas privadas con `noindex`

## Requisitos

- Node.js 20.9 o superior
- Una cuenta gratuita en [Supabase](https://supabase.com)

## Instalación

```bash
git clone
cd resguardo
npm install
cp .env.example .env.local   # y completa los valores
npm run dev
```

Abre <http://localhost:3000>.

### Variables de entorno

| Variable                               | Descripción                               |
| -------------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | URL del proyecto (Project Settings → API) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key (`sb_publishable_…`)      |
| `NEXT_PUBLIC_SITE_URL`                 | URL pública del sitio, sin barra final    |

## Scripts

| Comando             | Acción                        |
| ------------------- | ----------------------------- |
| `npm run dev`       | Servidor de desarrollo        |
| `npm run build`     | Build de producción           |
| `npm run start`     | Sirve el build                |
| `npm run typecheck` | Verifica tipos con TypeScript |

## Estructura

```
app/
  (auth)/            login, register, forgot-password, reset-password
  auth/confirm/      Route Handler que verifica los enlaces de correo
  dashboard/         Área privada (resumen y «Mi cuenta»)
components/          UI y formularios
lib/
  auth/              Server Actions, sesión, tipos y mensajes
  supabase/          Clientes: browser, server y proxy
  validations/       Esquemas Zod compartidos
proxy.ts             Protección de rutas y refresco de sesión
docs/                Guía de seguridad
```

## Seguridad

- [ ] Cookies de sesión con `httpOnly`, `secure` y `sameSite`
- [ ] Sin tokens en `localStorage` ni cookies legibles por JavaScript
- [ ] Protección XSS (CSP, escape de React, validación)
- [ ] Protección CSRF (`SameSite`, verificación de `Origin` en Server Actions, logout por POST)
- [ ] Validación en cliente y servidor con Zod
- [ ] Proxy que protege rutas privadas y refresca la sesión
- [ ] Verificación del usuario en el servidor (defensa en profundidad)
- [ ] Mensajes de error seguros (sin enumeración de usuarios)
- [ ] Variables de entorno fuera del repositorio
- [ ] RLS activado en las tablas
