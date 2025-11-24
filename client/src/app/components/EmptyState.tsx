import React from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export function EmptyState({ title, description, className = "" }: EmptyStateProps) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white/80 p-12 text-center space-y-3 ${className}`}>
      <p className="text-2xl font-semibold text-slate-900">{title}</p>
      {description && <p className="text-slate-500">{description}</p>}
    </div>
  );
}

