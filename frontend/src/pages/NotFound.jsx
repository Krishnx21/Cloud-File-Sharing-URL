import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";

export function NotFound() {
  return (
    <div className="app-bg flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm text-primary">404</p>
      <h1 className="mt-2 text-4xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-400">The page you opened is not available in this workspace.</p>
      <Link to="/" className="mt-8">
        <Button>Back home</Button>
      </Link>
    </div>
  );
}
