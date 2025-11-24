"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { ErrorMessage } from "../components/ErrorMessage";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }

      const res = await api.post("/users/register", {
        email,
        password,
        username,
      });

      if (res.success) {
        // Redirect to login page after successful registration
        router.push("/login?registered=true");
      } else {
        setError(res.message || "Failed to create account");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 rounded-3xl border border-white/70 shadow-xl shadow-slate-200/60 p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-600">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 text-slate-900"
                placeholder="Your username"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 text-slate-900"
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 text-slate-900"
                placeholder="••••••••"
                disabled={loading}
              />
              <p className="text-xs text-slate-500 mt-1">Must be at least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-linear-to-r from-slate-900 to-slate-700 text-white font-semibold shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="text-slate-900 font-semibold hover:underline">
              Sign in
            </Link>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

