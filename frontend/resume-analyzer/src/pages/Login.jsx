import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;

  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((item) => item?.msg || item).join(", ");
  if (detail && typeof detail === "object") return detail.msg || "Unable to log in right now.";

  return "Invalid email or password";
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/auth/login",
        new URLSearchParams({ username: email, password }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const token = response.data?.access_token;
      if (!token) throw new Error("No access token returned");

      localStorage.setItem("access_token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to your account"
      subtitle="Pick up right where your last resume scan left off."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}

          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>

        <div className="relative py-2 text-center">
          <span className="relative z-10 bg-transparent px-3 text-xs text-muted-foreground">
            or continue with
          </span>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        </div>

        <Button type="button" variant="outline" className="w-full" size="lg">
          Continue with Google
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
          Sign up free
        </Link>
      </p>
    </AuthShell>
  );
}
