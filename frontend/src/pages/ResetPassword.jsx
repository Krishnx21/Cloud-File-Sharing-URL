import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/common/Logo.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { resetPassword } from "../services/auth.service.js";

export function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ token: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await resetPassword(form);
      navigate("/login");
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
          <h1 className="text-2xl font-semibold">Set new password</h1>
          <p className="mt-2 text-sm text-slate-400">Paste the reset token and choose a new password.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <Input placeholder="Reset token" value={form.token} onChange={(event) => setForm({ ...form, token: event.target.value })} required />
            <Input type="password" placeholder="New password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <Button className="w-full" disabled={loading}>{loading ? "Saving..." : "Reset password"}</Button>
          </form>
          <Link to="/login" className="mt-5 block text-center text-sm text-primary hover:underline">Back to login</Link>
        </Card>
      </div>
    </div>
  );
}
