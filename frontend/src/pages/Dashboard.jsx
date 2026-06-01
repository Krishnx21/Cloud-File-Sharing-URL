import { motion } from "framer-motion";
import { Clock3, Files, HardDrive, Link2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { FileCard } from "../components/file/FileCard.jsx";
import { FileSkeleton } from "../components/file/FileSkeleton.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { useFiles } from "../hooks/useFiles.js";
import { formatBytes } from "../lib/utils.js";

export function Dashboard() {
  const { files, loading, error } = useFiles();
  const activeFiles = files.filter((file) => !file.expiresAt || new Date(file.expiresAt) > new Date());
  const expiringSoon = activeFiles.filter((file) => file.expiresAt && new Date(file.expiresAt) - new Date() < 3 * 86400000);
  const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
  const totalDownloads = files.reduce((sum, file) => sum + (file.downloadCount || 0), 0);

  const stats = [
    { label: "Total files", value: files.length, icon: Files },
    { label: "Active links", value: activeFiles.length, icon: Link2 },
    { label: "Downloads", value: totalDownloads, icon: HardDrive },
    { label: "Expiring soon", value: expiringSoon.length, icon: Clock3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-primary">Dashboard</p>
          <h1 className="mt-1 text-3xl font-semibold text-white">Your secure sharing hub</h1>
          <p className="mt-2 text-sm text-slate-400">Monitor uploads, expiry windows, and shared-file activity in one workspace.</p>
        </div>
        <Link to="/app/upload">
          <Button>
            <Upload size={17} /> New upload
          </Button>
        </Link>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <stat.icon size={19} className="text-primary" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Recent uploads</h2>
              <p className="text-sm text-slate-500">Latest files available for sharing.</p>
            </div>
            <Link to="/app/history" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          {loading ? (
            <FileSkeleton />
          ) : error ? (
            <p className="rounded-lg border border-rose-300/20 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</p>
          ) : files.length ? (
            <div className="grid gap-3 lg:grid-cols-2">
              {files.slice(0, 4).map((file) => <FileCard key={file.id || file._id} file={file} />)}
            </div>
          ) : (
            <p className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">No files uploaded yet. Create your first secure link from the upload page.</p>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold text-white">Upload health</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Your share flow is configured for authenticated uploads, expiring links, and Cloudinary delivery.</p>
          <div className="mt-6 space-y-4">
            {[
              `${formatBytes(totalSize)} stored`,
              `${totalDownloads} total downloads`,
              `${activeFiles.length} active links`,
              `${expiringSoon.length} links expiring in 3 days`
            ].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3">
                <span className="text-sm text-slate-300">{item}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-glow" />
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
