import { motion } from "framer-motion";
import { ArrowRight, Clock3, FileCheck2, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../components/common/Logo.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";

const features = [
  { icon: ShieldCheck, title: "Private by design", text: "Authenticated uploads with expiring links for controlled sharing." },
  { icon: UploadCloud, title: "Fast uploads", text: "A clean drag-and-drop flow backed by your Cloudinary storage." },
  { icon: Clock3, title: "Link expiry", text: "Choose expiry windows and keep old file links from living forever." }
];

export function Landing() {
  return (
    <div className="app-bg min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
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

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-5">
              <Sparkles size={13} /> Premium file sharing workspace
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Smart file sharing with expiring cloud links.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Upload, protect, and share files from a polished SaaS dashboard built for speed, clarity, and trust.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button className="w-full sm:w-auto">
                  Create account <ArrowRight size={17} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="w-full sm:w-auto">Open dashboard</Button>
              </Link>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.6 }} className="relative">
            <Card className="animate-float p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Today</p>
                  <h2 className="text-xl font-semibold">Transfer activity</h2>
                </div>
                <Badge>Live</Badge>
              </div>
              <div className="space-y-3">
                {["Krishna_Resume_v2.pdf", "client-contract.docx", "project-assets.zip"].map((name, index) => (
                  <div key={name} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FileCheck2 size={19} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{name}</p>
                          <p className="text-xs text-slate-500">Expires in {index + 2} days</p>
                        </div>
                      </div>
                      <div className="h-2 w-20 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${92 - index * 18}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.section>
        </div>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
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
