import { ExternalLink, Link2 } from "lucide-react";
import { CopyButton } from "../common/CopyButton.jsx";
import { Card } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";

export function ShareLinkCard({ file }) {
  if (!file?.shareableLink) return null;

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <Link2 size={16} /> Shareable link ready
          </div>
          <p className="truncate rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300">{file.shareableLink}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <CopyButton value={file.shareableLink} />
          <a href={file.shareableLink} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink size={16} /> Open
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}
