import { Calendar, FileText } from "lucide-react";
import { CopyButton } from "../common/CopyButton.jsx";
import { Badge } from "../ui/badge.jsx";
import { Card } from "../ui/card.jsx";
import { formatBytes, formatDate } from "../../lib/utils.js";

export function FileCard({ file }) {
  const expired = file.expiresAt && new Date(file.expiresAt) < new Date();

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-primary">
          <FileText size={21} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-white">{file.filename}</p>
          <p className="mt-1 text-sm text-slate-500">{formatBytes(file.size)} · {file.mimetype}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant={expired ? "warn" : "default"}>{expired ? "Expired" : "Active"}</Badge>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={13} /> Expires {formatDate(file.expiresAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <CopyButton value={file.shareableLink} label="Copy link" />
      </div>
    </Card>
  );
}
