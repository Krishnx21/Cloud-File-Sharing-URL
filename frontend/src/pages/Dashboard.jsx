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
import { formatBytes } from "../lib/utils.js";

const filters = ["all", "active", "expired", "images", "pdfs"];

export function Dashboard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const { files, loading, error, removeFile } = useFiles();

  const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
  const totalDownloads = files.reduce((sum, file) => sum + (file.downloadCount || 0), 0);
  const activeCount = files.filter((file) => !file.expiresAt || new Date(file.expiresAt) > new Date()).length;

  const filtered = useMemo(
    () =>
      files
        .filter((file) => file.filename?.toLowerCase().includes(query.toLowerCase()))
        .filter((file) => {
          const expired = file.expiresAt && new Date(file.expiresAt) < new Date();
          if (filter === "active") return !expired;
          if (filter === "expired") return expired;
          if (filter === "images") return file.mimetype?.startsWith("image/");
          if (filter === "pdfs") return file.mimetype?.includes("pdf");
          return true;
        }),
    [files, query, filter]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm text-primary">Workspace</p>
          <h1 className="mt-1 text-3xl font-semibold text-[#f4f1ea]">My Files</h1>
          <p className="mt-2 text-sm text-slate-400">Upload, search, share, and remove files from one focused view.</p>
        </div>
        <Link to="/app/upload">
          <Button className="w-full sm:w-auto">
            <Upload size={16} /> Upload file
          </Button>
        </Link>
      </div>

      <section className="grid gap-3 rounded-lg border border-white/10 bg-[#101318] p-4 text-sm sm:grid-cols-3">
        <div>
          <p className="text-slate-500">Files</p>
          <p className="mt-1 text-xl font-semibold text-[#f4f1ea]">{files.length}</p>
        </div>
        <div>
          <p className="text-slate-500">Active links</p>
          <p className="mt-1 text-xl font-semibold text-[#f4f1ea]">{activeCount}</p>
        </div>
        <div>
          <p className="text-slate-500">Storage / downloads</p>
          <p className="mt-1 text-xl font-semibold text-[#f4f1ea]">{formatBytes(totalSize)} · {totalDownloads}</p>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-[#101318] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-3 text-slate-500" size={18} />
            <Input className="pl-10" placeholder="Search by filename" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-md border px-3 py-1.5 text-sm capitalize transition ${filter === item ? "border-primary/40 bg-primary/10 text-primary" : "border-white/10 bg-[#0e1116] text-slate-400 hover:text-slate-200"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

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
        <EmptyState title="No files here" description="Upload a file or adjust the search and filters." />
      )}
    </div>
  );
}
