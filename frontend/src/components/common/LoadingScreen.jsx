import { Logo } from "./Logo.jsx";

export function LoadingScreen() {
  return (
    <div className="app-bg flex min-h-screen items-center justify-center">
      <div className="animate-pulse">
        <Logo />
      </div>
    </div>
  );
}
