import { useEffect, useState } from "react";
import { deleteFile, getFiles } from "../services/file.service.js";

export function useFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setError("");

    try {
      const response = await getFiles();
      setFiles(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeFile(id) {
    await deleteFile(id);
    setFiles((current) => current.filter((file) => (file.id || file._id) !== id));
  }

  useEffect(() => {
    refresh();
  }, []);

  return { files, loading, error, refresh, removeFile };
}
