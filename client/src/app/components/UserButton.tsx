"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function UserButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="px-4 py-2 rounded-full bg-white/50 text-black animate-pulse">
        Loading...
      </div>
    );
  }

  if (session?.user) {
            const handleSignOut = async () => {
              // Sign out, but don't redirect automatically.
              await signOut({ redirect: false });
              // Force a full page reload to the login page.
              // This clears the Next.js client-side cache.
              window.location.href = "/login";
            };
    
            return (
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-full bg-white/50 text-black">
                    <span className="text-sm font-medium">{session.user.name || session.user.email}</span>
                    </div>
                    <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-full border border-white/50 text-white hover:bg-white/10 transition"
                    >
                    Sign Out
                    </button>
                </div>
            );  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 rounded-full border border-white/50 text-white hover:bg-white/10 transition"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 rounded-full bg-white/50 text-black hover:bg-white/70 transition"
      >
        Sign Up
      </Link>
    </div>
  );
}

