import { cn } from "../../lib/utils.js";

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    muted: "border-white/10 bg-white/10 text-slate-300",
    warn: "border-amber-300/20 bg-amber-300/10 text-amber-100"
  };

  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", variants[variant], className)}
      {...props}
    />
  );
}
