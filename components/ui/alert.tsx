import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

type AlertProps = { tone: "error" | "success"; children: ReactNode };

export function Alert({ tone, children }: AlertProps) {
  const isError = tone === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex gap-3 rounded-md px-4 py-3 text-sm ${
        isError ? "bg-danger-bg text-danger" : "bg-ok-bg text-ok"
      }`}
    >
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
      <p>{children}</p>
    </div>
  );
}
