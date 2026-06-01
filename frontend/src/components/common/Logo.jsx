import { Cloud } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-primary shadow-glow">
        <Cloud size={22} />
      </div>
      <div>
        <p className="text-sm font-bold tracking-wide text-white">ShareCloud</p>
        <p className="text-xs text-slate-500">Secure file links</p>
      </div>
    </div>
  );
}
