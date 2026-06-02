import { Download, ExternalLink, Trash2 } from "lucide-react";
import { CopyButton } from "../common/CopyButton.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { formatBytes, formatDate } from "../../lib/utils.js";
import { FileTypeIcon } from "./FileTypeIcon.jsx";

export function FileTable({ files, onDelete }) {
  return (
    <div className="hidden overflow-hidden rounded-lg border border-white/10 bg-[#101318] md:block">
      <table className="w-full table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[38%]" />
          <col className="w-[8%]" />
          <col className="w-[10%]" />
          <col className="w-[10%]" />
          <col className="w-[10%]" />
          <col className="w-[24%]" />
        </colgroup>
        <thead className="border-b border-white/10 bg-[#0d1014] text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">File</th>
            <th className="px-4 py-3 font-medium">Size</th>
            <th className="px-4 py-3 font-medium">Expires</th>
            <th className="px-4 py-3 font-medium">Downloads</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => {
            const expired = file.expiresAt && new Date(file.expiresAt) < new Date();
            return (
              <tr key={file.id || file._id} className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.025]">
                <td className="px-4 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <FileTypeIcon mimetype={file.mimetype} />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-[#f4f1ea]">{file.filename}</p>
                      <p className="truncate text-xs text-slate-500">{file.mimetype}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-300">
                  <span className="block truncate">{formatBytes(file.size)}</span>
                </td>
                <td className="px-4 py-4 text-slate-300">{formatDate(file.expiresAt)}</td>
                <td className="px-4 py-4 text-slate-300">
                  <span className="inline-flex items-center gap-1">
                    <Download size={14} /> {file.downloadCount || 0}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <Badge variant={expired ? "warn" : "default"}>{expired ? "Expired" : "Active"}</Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <CopyButton className="shrink-0" value={file.shareableLink} label="Copy" />
                    <a href={file.shareableLink} target="_blank" rel="noreferrer">
                      <Button className="shrink-0" size="sm" variant="outline" aria-label={`Open ${file.filename}`}>
                        <ExternalLink size={15} />
                      </Button>
                    </a>
                    {onDelete ? (
                      <Button className="shrink-0" size="sm" variant="danger" onClick={() => onDelete(file.id || file._id)} aria-label={`Delete ${file.filename}`}>
                        <Trash2 size={15} />
                      </Button>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
