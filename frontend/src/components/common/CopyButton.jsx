import { Check, Copy } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";

export function CopyButton({ value, label = "Copy" }) {
  const { copied, copy } = useClipboard();

  return (
    <Button size="sm" variant={copied ? "default" : "secondary"} onClick={() => copy(value)} disabled={!value}>
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copied" : label}
    </Button>
  );
}
