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
        className={`glass-card flex min-h-[330px] flex-col items-center justify-center rounded-xl border-dashed p-8 text-center transition ${
          dragging ? "border-primary/70 bg-primary/10" : ""
        }`}
      >
        <input ref={inputRef} type="file" className="hidden" onChange={(event) => chooseFile(event.target.files?.[0])} />
        <motion.div animate={{ y: dragging ? -5 : 0, scale: dragging ? 1.04 : 1 }} className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-primary">
          <UploadCloud size={30} />
        </motion.div>
        <h2 className="text-2xl font-semibold text-white">Drop your file here</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">Upload PDFs, images, archives, or documents and generate an expiring secure link.</p>
        <Button className="mt-6" variant="secondary" onClick={() => inputRef.current?.click()}>
          <FileUp size={17} /> Browse file
        </Button>
      </div>

      <AnimatePresence>
        {file ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="glass-card rounded-xl p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{file.name}</p>
                <p className="mt-1 text-sm text-slate-500">{formatBytes(file.size)} · {file.type || "Unknown type"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[1, 7, 30].map((days) => (
                  <button
                    key={days}
                    onClick={() => setExpiresInDays(days)}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${expiresInDays === days ? "border-primary/50 bg-primary/15 text-primary" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`}
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
                <p className="text-xs text-slate-500">{status === "success" ? "Upload complete" : "Encrypting route and sending to cloud storage"}</p>
              </div>
            ) : null}
            {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
