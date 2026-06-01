import { AnimatePresence, motion } from "framer-motion";
import { FileUp, Loader2, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";
import { formatBytes } from "../../lib/utils.js";
import { Button } from "../ui/button.jsx";
import { Progress } from "../ui/progress.jsx";

export function UploadDropzone({ onUpload, status, progress, error }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [expiresInDays, setExpiresInDays] = useState(7);

  function chooseFile(nextFile) {
    if (nextFile) setFile(nextFile);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    chooseFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="space-y-5">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`glass-card flex min-h-[330px] flex-col items-center justify-center rounded-lg border-dashed p-8 text-center transition ${
          dragging ? "border-primary/70 bg-primary/10" : "border-white/10"
        }`}
      >
        <input ref={inputRef} type="file" className="hidden" onChange={(event) => chooseFile(event.target.files?.[0])} />
        <motion.div animate={{ y: dragging ? -3 : 0 }} className="mb-5 flex h-14 w-14 items-center justify-center rounded-md border border-white/10 bg-[#0e1116] text-primary">
          <UploadCloud size={28} />
        </motion.div>
        <h2 className="text-2xl font-semibold text-[#f4f1ea]">Add a file</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">Choose a file, set how long the link should live, then share it.</p>
        <Button className="mt-6" variant="secondary" onClick={() => inputRef.current?.click()}>
          <FileUp size={17} /> Browse file
        </Button>
      </div>

      <AnimatePresence>
        {file ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="glass-card rounded-lg p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#f4f1ea]">{file.name}</p>
                <p className="mt-1 text-sm text-slate-500">{formatBytes(file.size)} · {file.type || "Unknown type"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[1, 7, 30].map((days) => (
                  <button
                    key={days}
                    onClick={() => setExpiresInDays(days)}
                    className={`rounded-md border px-3 py-2 text-sm transition ${expiresInDays === days ? "border-primary/50 bg-primary/15 text-primary" : "border-white/10 bg-[#0e1116] text-slate-300 hover:bg-white/[0.06]"}`}
                  >
                    {days} day{days > 1 ? "s" : ""}
                  </button>
                ))}
                <Button onClick={() => onUpload(file, expiresInDays)} disabled={status === "uploading"}>
                  {status === "uploading" ? <Loader2 className="animate-spin" size={17} /> : <UploadCloud size={17} />}
                  Upload
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                  <X size={17} />
                </Button>
              </div>
            </div>
            {status === "uploading" || status === "success" ? (
              <div className="mt-5 space-y-2">
                <Progress value={progress} />
                <p className="text-xs text-slate-500">{status === "success" ? "Upload complete" : "Sending to storage"}</p>
              </div>
            ) : null}
            {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
