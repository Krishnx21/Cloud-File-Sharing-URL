import { cn } from "../../lib/utils.js";

export function Card({ className, ...props }) {
  return <div className={cn("glass-card rounded-xl", className)} {...props} />;
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("space-y-2 p-5", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-5 pt-0", className)} {...props} />;
}
