import React from "react";

type LoadMoreButtonProps = {
  onClick: () => void;
  count?: number;
  className?: string;
};

export function LoadMoreButton({ onClick, count = 4, className = "" }: LoadMoreButtonProps) {
  return (
    <div className={`text-center pt-4 ${className}`}>
      <button
        onClick={onClick}
        className="px-6 py-3 rounded-full bg-linear-to-r from-slate-900 to-slate-700 text-white font-semibold shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 transition"
      >
        Load {count} more stories
      </button>
    </div>
  );
}

