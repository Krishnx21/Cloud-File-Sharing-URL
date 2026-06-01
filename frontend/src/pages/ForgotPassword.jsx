import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/common/Logo.jsx";
import { CopyButton } from "../components/common/CopyButton.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { forgotPassword } from "../services/auth.service.js";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setToken("");

    try {
      const response = await forgotPassword(email);
      setToken(response.data?.resetToken || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-bg flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card className="p-6">
          <h1 className="text-2xl font-semibold">Reset password</h1>
          <p className="mt-2 text-sm text-slate-400">Enter your account email to generate a local reset token.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <Input type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <Button className="w-full" disabled={loading}>{loading ? "Generating..." : "Generate reset token"}</Button>
          </form>
          {token ? (
            <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <p className="mb-2 text-xs text-slate-500">Development reset token</p>
              <p className="break-all text-sm text-slate-200">{token}</p>
              <div className="mt-3 flex gap-2">
                <CopyButton value={token} />
                <Link to="/reset-password">
                  <Button variant="secondary" size="sm">Use token</Button>
                </Link>
              </div>
            </div>
          ) : null}
          <Link to="/login" className="mt-5 block text-center text-sm text-primary hover:underline">Back to login</Link>
        </Card>
      </div>
    </div>
  );
}
