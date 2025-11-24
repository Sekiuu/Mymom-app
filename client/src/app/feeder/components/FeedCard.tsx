import React from "react";
import { FeedItem } from "../types";
import { formatTime, getAuthorName } from "../utils";

export function FeedCard({ item, user_id, onSelectImage }: {
  item: FeedItem;
  user_id?: string;
  onSelectImage: (url?: string | null) => void;
}) {
  const author = getAuthorName(item, user_id || "none");
  const tag = item.image ? "Photo drop" : "Notebook";
  const tagColor = item.image ? "text-fuchsia-600 bg-fuchsia-50" : "text-slate-600 bg-slate-100";

  return (
    <article className="bg-white/90 rounded-3xl border border-white/70 shadow-xl shadow-slate-200/60 overflow-hidden">
      <div className="p-5 flex flex-wrap gap-2 items-baseline justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <h3 className="font-semibold text-slate-900">{author}</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
        </div>
        <p className="text-xs text-slate-500">{formatTime(item.create_at)}</p>
      </div>

      {item.image && (
        <button
          onClick={() => onSelectImage(item.image)}
          className="block w-full bg-slate-900/5 relative group"
          aria-label="Open image"
        >
          <img src={item.image} alt="Shared moment" className="w-full h-80 object-cover" />
          <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-slate-900 opacity-0 group-hover:opacity-100 transition">
            Tap to open
          </span>
        </button>
      )}

      <div className="p-6">
        <p className="text-slate-700 leading-relaxed">{item.content}</p>
      </div>
    </article>
  );
}

