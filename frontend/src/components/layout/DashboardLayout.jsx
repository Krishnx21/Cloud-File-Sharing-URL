import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-bg min-h-screen">
      <Navbar onMenu={() => setOpen(true)} />
      <div className="lg:grid lg:grid-cols-[18rem_1fr]">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
