"use client";
import React, { useState, FormEvent, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ErrorMessage } from "../components/ErrorMessage";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess(true);
    }
  }, [searchParams]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        router.replace("/feeder");
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 rounded-3xl border border-white/70 shadow-xl shadow-slate-200/60 p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {success && (
              <div className="rounded-2xl border border-green-200 bg-green-50 text-green-700 p-4">
                Account created successfully! Please sign in.
              </div>
            )}
            {error && <ErrorMessage message={error} />}

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
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 text-slate-900"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-linear-to-r from-slate-900 to-slate-700 text-white font-semibold shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link href="/signin" className="text-slate-900 font-semibold hover:underline">
              Sign up
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </main>
    }>
      <LoginForm />
    </Suspense>
  );
}

