import React from "react";

export type FilterOption = {
  id: string;
  label: string;
};

type FilterBarProps = {
  filters: readonly FilterOption[];
  activeFilter: FilterOption["id"];
  onChange: (id: FilterOption["id"]) => void;
  count: number;
};

export function FilterBar({ filters, activeFilter, onChange, count }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onChange(filter.id)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
            activeFilter === filter.id
              ? "bg-slate-900 text-white border-slate-900"
              : "border-slate-200 text-slate-800 hover:border-slate-300"
          }`}
        >
          {filter.label}
        </button>
      ))}
      <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
        {count} {count === 1 ? "entry" : "entries"}
      </span>
    </div>
  );
}

