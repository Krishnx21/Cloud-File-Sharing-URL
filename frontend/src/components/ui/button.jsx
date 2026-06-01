import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#e4c784]",
        secondary: "border border-white/10 bg-[#171c22] text-slate-100 hover:bg-[#1d232b]",
        ghost: "text-slate-300 hover:bg-white/[0.06] hover:text-white",
        outline: "border border-white/15 bg-transparent text-slate-100 hover:bg-white/[0.06]",
        danger: "bg-[#b95d5d] text-white hover:bg-[#c96b6b]"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
