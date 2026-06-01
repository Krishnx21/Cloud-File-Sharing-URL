import { ExternalLink, Link2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { CopyButton } from "../common/CopyButton.jsx";
import { Button } from "../ui/button.jsx";
import { Card } from "../ui/card.jsx";

export function ShareLinkCard({ file }) {
  if (!file?.shareableLink) return null;

  const isLocalhostLink = file.shareableLink.includes("localhost") || file.shareableLink.includes("127.0.0.1");

  return (
    <Card className="p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <Link2 size={16} /> Link ready
          </div>
          <p className="truncate rounded-md border border-white/10 bg-[#0e1116] px-3 py-2 text-sm text-slate-300">{file.shareableLink}</p>
          {isLocalhostLink ? (
            <p className="mt-2 text-xs leading-5 text-[#f1b4ad]">
              QR from a phone will not open while this link uses localhost. Use your laptop LAN IP or a public tunnel.
            </p>
          ) : null}
        </div>
        <div className="w-fit rounded-md bg-white p-2">
          <QRCodeCanvas value={file.shareableLink} size={84} />
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
