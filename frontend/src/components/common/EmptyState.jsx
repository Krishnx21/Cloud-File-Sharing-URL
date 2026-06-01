import { UploadCloud } from "lucide-react";
import { Button } from "../ui/button.jsx";

export function EmptyState({ title, description, action, onAction }) {
  return (
    <div className="glass-card flex min-h-[280px] flex-col items-center justify-center rounded-xl p-8 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-primary">
        <UploadCloud size={26} />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{description}</p>
      {action ? (
        <Button className="mt-6" onClick={onAction}>
          {action}
        </Button>
      ) : null}
    </div>
  );
}
