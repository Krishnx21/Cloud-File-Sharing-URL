import { BarChart3, Files, UploadCloud, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils.js";
import { Button } from "../ui/button.jsx";

const items = [
  { to: "/app", label: "Dashboard", icon: BarChart3 },
  { to: "/app/upload", label: "Upload", icon: UploadCloud },
  { to: "/app/history", label: "File History", icon: Files }
];

export function Sidebar({ open, onClose }) {
  return (
    <>
      <div className={cn("fixed inset-0 z-40 bg-black/60 lg:hidden", open ? "block" : "hidden")} onClick={onClose} />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-72 border-r border-white/10 bg-[#0d1014] p-4 transition-transform lg:sticky lg:top-16 lg:z-20 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="font-semibold">Menu</p>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        <nav className="space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/app"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white",
                  isActive && "border border-white/10 bg-[#171c22] text-[#f4f1ea]"
                )
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
