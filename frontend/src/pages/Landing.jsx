import { motion } from "framer-motion";
import { ArrowRight, Clock3, FileCheck2, FolderOpen, ShieldCheck, UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../components/common/Logo.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";

const features = [
  { icon: ShieldCheck, title: "Protected uploads", text: "Every upload belongs to a logged-in user." },
  { icon: UploadCloud, title: "One clean dropzone", text: "Upload a file, choose expiry, copy the link." },
  { icon: Clock3, title: "Links that age out", text: "Set expiry windows and keep old shares under control." }
];

export function Landing() {
  return (
    <div className="app-bg min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Start free</Button>
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Badge className="mb-5">
              <FolderOpen size={13} /> Local-first dashboard for shared files
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[#f4f1ea] sm:text-5xl lg:text-6xl">
              Send files without losing track of them.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
              FileDock is a simple control room for uploads, short-lived links, download counts, and cleanup. No drama, no mystery panels.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button className="w-full sm:w-auto">
                  Create account <ArrowRight size={17} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="w-full sm:w-auto">Sign in</Button>
              </Link>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.45 }} className="relative">
            <Card className="p-4">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Workspace</p>
                  <h2 className="mt-1 text-lg font-semibold">My files</h2>
                </div>
                <Badge>4 active links</Badge>
              </div>
              <div className="space-y-3">
                {["Krishna_Resume_v2.pdf", "client-contract.docx", "project-assets.zip"].map((name, index) => (
                  <div key={name} className="rounded-md border border-white/10 bg-[#0e1116] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <FileCheck2 size={19} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{name}</p>
                          <p className="text-xs text-slate-500">{index + 1} downloads · expires in {index + 2} days</p>
                        </div>
                      </div>
                      <div className="h-2 w-16 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-primary/80" style={{ width: `${92 - index * 18}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md border border-dashed border-white/10 p-4 text-sm text-slate-400">
                Drop a new file here and FileDock returns a share link plus QR code.
              </div>
            </Card>
          </motion.section>
        </div>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="p-5">
              <feature.icon className="mb-5 text-primary" size={24} />
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{feature.text}</p>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
