import { Link } from "react-router-dom";
import { Menu, Upload } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Logo } from "../common/Logo.jsx";
import { UserDropdown } from "./UserDropdown.jsx";

export function Navbar({ onMenu }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0d10]/95">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu}>
            <Menu size={20} />
          </Button>
          <Logo />
        </div>
        <div className="flex items-center gap-3">
          <Link to="/app/upload">
            <Button size="sm">
              <Upload size={16} /> Upload
            </Button>
          </Link>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
