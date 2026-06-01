import { motion } from "framer-motion";
import { useState } from "react";
import { ShareLinkCard } from "../components/file/ShareLinkCard.jsx";
import { UploadDropzone } from "../components/file/UploadDropzone.jsx";
import { useUpload } from "../hooks/useUpload.js";

function saveUploadedFile(file) {
  const saved = localStorage.getItem("sharecloud_files");
  const files = saved ? JSON.parse(saved) : [];
  const normalized = {
    ...file,
    id: file.id || file._id,
    createdAt: new Date().toISOString()
  };
  localStorage.setItem("sharecloud_files", JSON.stringify([normalized, ...files]));
}

export function Upload() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const upload = useUpload((file) => {
    saveUploadedFile(file);
    setUploadedFile(file);
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm text-primary">Upload</p>
        <h1 className="mt-1 text-3xl font-semibold text-[#f4f1ea]">Create a file link</h1>
        <p className="mt-2 text-sm text-slate-400">Upload once, then copy the link or scan the QR code.</p>
      </div>
      <UploadDropzone onUpload={upload.startUpload} status={upload.status} progress={upload.progress} error={upload.error} />
      {uploadedFile ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <ShareLinkCard file={uploadedFile} />
        </motion.div>
      ) : null}
    </div>
  );
}
