import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "../components/common/EmptyState.jsx";
import { FileCard } from "../components/file/FileCard.jsx";
import { FileTable } from "../components/file/FileTable.jsx";
import { FileSkeleton } from "../components/file/FileSkeleton.jsx";
import { Input } from "../components/ui/input.jsx";
import { useFiles } from "../hooks/useFiles.js";

export function FileHistory() {
  const [query, setQuery] = useState("");
  const { files, loading, error, removeFile } = useFiles();
  const filtered = useMemo(
    () => files.filter((file) => file.filename?.toLowerCase().includes(query.toLowerCase())),
    [files, query]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm text-primary">File history</p>
          <h1 className="mt-1 text-3xl font-semibold text-white">Every shared file</h1>
          <p className="mt-2 text-sm text-slate-400">Search, open, and copy links for your uploaded files.</p>
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="pointer-events-none absolute left-3 top-3 text-slate-500" size={18} />
          <Input className="pl-10" placeholder="Search files" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>

      {loading ? (
        <FileSkeleton />
      ) : error ? (
        <p className="rounded-lg border border-rose-300/20 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</p>
      ) : filtered.length ? (
        <>
          <FileTable files={filtered} onDelete={removeFile} />
          <div className="grid gap-3 md:hidden">
            {filtered.map((file) => <FileCard key={file.id || file._id} file={file} onDelete={removeFile} />)}
          </div>
        </>
      ) : (
        <EmptyState title="No files found" description="Upload your first file or adjust the search to find an existing share link." />
      )}
    </div>
  );
}
