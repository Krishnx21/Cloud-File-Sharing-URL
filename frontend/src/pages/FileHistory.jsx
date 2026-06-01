import { Search, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState.jsx";
import { FileCard } from "../components/file/FileCard.jsx";
import { FileSkeleton } from "../components/file/FileSkeleton.jsx";
import { FileTable } from "../components/file/FileTable.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { useFiles } from "../hooks/useFiles.js";

const filters = ["all", "active", "expired", "images"];

export function FileHistory() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const { files, loading, error, removeFile } = useFiles();

  const filtered = useMemo(
    () =>
      files
        .filter((file) => file.filename?.toLowerCase().includes(query.toLowerCase()))
        .filter((file) => {
          const expired = file.expiresAt && new Date(file.expiresAt) < new Date();
          if (filter === "active") return !expired;
          if (filter === "expired") return expired;
          if (filter === "images") return file.mimetype?.startsWith("image/");
          return true;
        }),
    [files, query, filter]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm text-primary">My Files</p>
          <h1 className="mt-1 text-3xl font-semibold text-[#f4f1ea]">Uploaded files</h1>
          <p className="mt-2 text-sm text-slate-400">Search, filter, share, and remove files from one place.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-3 text-slate-500" size={18} />
            <Input className="pl-10" placeholder="Search files" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <Link to="/app/upload">
            <Button className="w-full sm:w-auto">
              <Upload size={16} /> Upload
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-md border px-3 py-1.5 text-sm capitalize transition ${filter === item ? "border-primary/40 bg-primary/10 text-primary" : "border-white/10 bg-[#101318] text-slate-400 hover:text-slate-200"}`}
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? (
        <FileSkeleton />
      ) : error ? (
        <p className="rounded-md border border-[#d08b85]/20 bg-[#d08b85]/10 p-4 text-sm text-[#f1b4ad]">{error}</p>
      ) : filtered.length ? (
        <>
          <FileTable files={filtered} onDelete={removeFile} />
          <div className="grid gap-3 md:hidden">
            {filtered.map((file) => <FileCard key={file.id || file._id} file={file} onDelete={removeFile} />)}
          </div>
        </>
      ) : (
        <EmptyState title="No files found" description="Upload a file or adjust the filter to find an existing share link." />
      )}
    </div>
  );
}
