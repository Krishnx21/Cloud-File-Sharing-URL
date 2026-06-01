import { cn } from "../../lib/utils.js";

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-primary/25 bg-primary/10 text-[#ecd39d]",
    muted: "border-white/10 bg-white/[0.06] text-slate-300",
    warn: "border-[#d08b85]/25 bg-[#d08b85]/10 text-[#f1b4ad]"
  };

  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", variants[variant], className)}
      {...props}
    />
  );
}
