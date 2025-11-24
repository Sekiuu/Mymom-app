"use client";
import React from "react";
import Link from "next/link";
import Arrow from "../components/ui/arrow";
import { useSession } from "next-auth/react";
// import { UserButton } from "../components/UserButton";

export default function Hub() {
  const { data: session } = useSession();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* <div className="absolute top-8 right-8">
        <UserButton />
      </div> */}
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">Mamom</h1>
          <p className="text-xl md:text-2xl opacity-80">
            Share your moments and stories
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <Link
            href="/feeder"
            className="group relative bg-white/90 rounded-3xl border border-white/70 shadow-xl shadow-slate-200/60 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-sky-500 to-violet-700 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">Feeder</h2>
              </div>
              <p className="text-slate-600">
                Browse through all your shared moments, photos, and stories
              </p>
              <div className="flex items-center text-sky-600 group-hover:text-violet-700 transition-colors">
                <span className="text-sm font-medium">View feed</span>
                <Arrow size="1.5em" right style="ml-2" />
              </div>
            </div>
          </Link>

          {/* Admin Link */}
          {session?.user?.role === 'admin' && (
            <Link
              href="/admin"
              className="group relative bg-white/90 rounded-3xl border border-white/70 shadow-xl shadow-slate-200/60 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-900">Admin</h2>
                </div>
                <p className="text-slate-600">
                  Manage your feeds, create new posts, and configure settings
                </p>
                <div className="flex items-center text-rose-600 group-hover:text-amber-600 transition-colors">
                  <span className="text-sm font-medium">Go to admin</span>
                  <Arrow size="1.5em" right style="ml-2" />
                </div>
              </div>
            </Link>
          )}

        </div>
      </div>
    </main>
  );
}

