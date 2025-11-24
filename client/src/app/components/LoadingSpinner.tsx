import React from "react";

type LoadingSpinnerProps = {
  count?: number;
  className?: string;
};

export function LoadingSpinner({ count = 3, className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`grid gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-64 rounded-3xl bg-white/70 animate-pulse" />
      ))}
    </div>
  );
}

