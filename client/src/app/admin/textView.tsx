"use client";
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { PostRecord } from "../../lib/schemas";

export default function TextView({ onSelect, Reload }: { onSelect?: (text: PostRecord) => void, Reload: boolean, }) {
    const [rows, setRows] = useState<PostRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<PostRecord | null>(null);

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get("/posts");
                if (!res.success) throw new Error(res.message || "Failed to load texts");
                setRows(res.data as PostRecord[]);
            } catch (err: any) {
                console.error(err);
                setError(err?.message ?? "Failed to load texts");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [Reload]);

    return (
        <div className="w-full">
            <h2 className="font-semibold text-xl mb-3">Texts</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {!loading && !error && (
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                    {rows.length === 0 ? (
                        <p className="text-sm text-gray-500">No texts yet.</p>
                    ) : (
                        rows
                            .slice()
                            .sort((a, b) =>
                                (b.create_at || "").localeCompare(a.create_at || "")
                            )
                            .map((t) => (
                                <article
                                    onClick={() => {
                                        setSelected(t);
                                        onSelect?.(t);
                                    }}
                                    key={t.id}
                                    className={"rounded-md shadow-sm border border-gray-200 p-3 text-sm " +
                                        (selected?.id === t.id ? "bg-sky-200" :
                                            "bg-white hover:border-rose-400 hover:border-2 cursor-pointer")}
                                >
                                    <header className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-500">
                                            {t.create_at
                                                ? new Date(t.create_at).toLocaleString()
                                                : "No date"}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {t.user_id ? `User: ${t.user_id}` : "Anonymous"}
                                        </span>
                                    </header>
                                    <p className="text-gray-900 whitespace-pre-wrap">
                                        {t.content}
                                    </p>
                                    {t.image && (
                                        <div className={"text-gray-100 bg-gray-800 text-lg rounded-xl p-2 flex flex-col items-center justify-center w-1/2 text-center hover:h-min overflow-hidden" + 
                                            (t.id == selected?.id ? " h-min " : " h-1 ")
                                        }>
                                            <img
                                                src={t.image}
                                                alt={t.image}
                                                className="max-w-1/2 aspect-square object-cover"
                                            />
                                        </div>
                                    )}
                                </article>
                            ))
                    )}
                </div>
            )}
        </div>
    );
}


