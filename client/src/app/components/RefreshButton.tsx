import React from "react";

type RefreshButtonProps = {
  onClick: () => void;
  refreshing?: boolean;
  className?: string;
};

export function RefreshButton({ onClick, refreshing = false, className = "" }: RefreshButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full border border-slate-200 text-slate-800 hover:border-slate-300 transition ${className}`}
      disabled={refreshing}
    >
      {refreshing ? "Refreshing…" : "Refresh feed"}
    </button>
  );
}

