import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button } from "../ui/button.jsx";

export function UserDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const initial = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <div className="relative">
      <Button variant="ghost" className="h-11 px-2" onClick={() => setOpen((value) => !value)}>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">{initial}</span>
        <span className="hidden text-sm text-slate-300 sm:block">{user?.username || "User"}</span>
      </Button>
      {open ? (
        <div className="absolute right-0 z-50 mt-3 w-56 rounded-xl border border-white/10 bg-[#0b0d12]/95 p-2 shadow-glass backdrop-blur-xl">
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-white">{user?.username || "Account"}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/10">
            <User size={16} /> Profile
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/10">
            <Settings size={16} /> Settings
          </button>
          <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-200 hover:bg-rose-400/10">
            <LogOut size={16} /> Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
