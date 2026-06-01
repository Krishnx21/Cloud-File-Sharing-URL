import { useState } from "react";
import { uploadFile } from "../services/file.service.js";

export function useUpload(onUploaded) {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function startUpload(file, expiresInDays) {
    setStatus("uploading");
    setProgress(18);
    setError("");

    try {
      const timer = window.setInterval(() => {
        setProgress((current) => Math.min(current + 13, 86));
      }, 220);

      const response = await uploadFile({ file, expiresInDays });
      window.clearInterval(timer);
      setProgress(100);
      setStatus("success");
      onUploaded?.(response.data);
      return response.data;
    } catch (err) {
      setStatus("error");
      setError(err.message);
      throw err;
    }
  }

  function reset() {
    setStatus("idle");
    setProgress(0);
    setError("");
  }

  return { status, progress, error, startUpload, reset };
}
