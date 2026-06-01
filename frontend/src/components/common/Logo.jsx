import { FolderClosed } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
        <FolderClosed size={21} />
      </div>
      <div>
        <p className="text-sm font-bold tracking-wide text-[#f4f1ea]">FileDock</p>
        <p className="text-xs text-slate-500">Files, links, expiry</p>
      </div>
    </div>
  );
}
