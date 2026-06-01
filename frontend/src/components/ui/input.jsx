import { cn } from "../../lib/utils.js";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-primary/60 focus:ring-2 focus:ring-primary/20",
        className
      )}
      {...props}
    />
  );
}
