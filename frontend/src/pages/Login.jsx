import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/common/Logo.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/app");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app-bg flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card className="p-6">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Login to manage uploads and share links.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <Input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <Button className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={17} /> : null}
              Login
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-slate-500">
            No account? <Link className="text-primary hover:underline" to="/register">Register</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
