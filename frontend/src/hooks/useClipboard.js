import { useState } from "react";

export function useClipboard(timeout = 1400) {
  const [copied, setCopied] = useState(false);

  async function copy(value) {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), timeout);
  }

  return { copied, copy };
}
