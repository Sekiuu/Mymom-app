"use client";
import React, { useEffect, useState, FormEvent } from "react";
import { PostRecord } from "../../lib/schemas";
import { api, del } from "../../lib/api";

export default function TextPostForm({ initial, onSaved, onCancel }: {
    initial?: PostRecord;
    onSaved?: (saved: PostRecord) => void;
    onCancel?: () => void;
}) {
    const [content, setContent] = useState(initial?.content ?? "");
    const [imgUrl, setImgUrl] = useState(initial?.image ?? "");
    const [saving, setSaving] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setContent(initial?.content ?? "");
        setImgUrl(initial?.image ?? "");
    }, [initial]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        if (!content.trim()) {
            setError("Content cannot be empty.");
            return;
        }

        setSaving(true);
        try {
            if(content.length < 5){
                throw new Error("Content is too short. Minimum 5 characters required.");
            }
            const payload = { content: content, user_id: initial?.user_id, type: initial?.type ?? "", image: imgUrl };
            const res = initial?.id ?
                await api.put(`/texts/${initial.id}`, payload) :
                await api.post('/texts', payload);

            if (!res.success) {
                throw new Error(res.message.toString() || "Failed to save.");
            }
            else {
                alert(res.message);
            }
            const saved: PostRecord = res.data as PostRecord;
            onSaved?.(saved);
        } catch (err: any) {
            console.error(err);
            setError(err?.message ?? "Failed to save.");
        } finally {
            setContent("");
            setImgUrl("");
            setSaving(false);
        }
    }

    async function aiGenerate() {
        setError(null);
        setGenerating(true);
        try {
            const res = await api.get('/ai/prompt', {
                prompt: (content ? `Generate a text based on: ${content}` : "Generate a random text.") + ": for My Website Feed. My website is about sharing short texts and stories about dialy life. the Concept is to share my dialy life with some one you love to say that you're ok and doing good.\
                return only the text(about 10 - 12 words) content without any additional commentary or formatting."
            });
            if (!res.success) {
                throw new Error(res.data?.toString?.() || "Failed to generate text.");
            } else {
                setContent(res.data as string);
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.message ?? "Failed to generate text.");
        } finally {
            setGenerating(false);
        }
    }

    async function deleteText() {
        setError(null);
        setDeleting(true);
        try {
            const res = await api.del(`/texts/${initial?.id}`);
            if (!res.success) {
                throw new Error(res.data?.toString?.() || "Failed to delete text.");
            } else {
                alert(res.message);
                onSaved?.(null);
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.message ?? "Failed to delete text.");
        } finally {
            setDeleting(false);
            setContent("");
            setImgUrl("");
        }
    }
        

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 720 }}>
            <label style={{ display: "block", marginBottom: 8 }}>
                Text
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    // rows={6}
                    className="w-full bg-black/50 p-2 rounded"
                    disabled={saving}
                />
            </label>
            <label className="mb-6">
                Image URL
                <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    className="w-full bg-black/50 p-2 rounded"
                    disabled={saving}
                />
            </label>

            {error && (
                <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>
            )}

            <div style={{ display: "flex", gap: 8 }}>

                <button className="bg-teal-500 p-2 rounded-xl mt-2" type="submit" disabled={saving}>
                    {saving ? "Saving..." : initial?.id ? "Update" : "Create"}
                </button>

                <button className="bg-amber-500 p-2 rounded-xl mt-2"
                    type="button"
                    onClick={() => {
                        setContent(initial?.content ?? "");
                        onCancel?.();
                    }}
                    disabled={saving}
                >
                    Cancel
                </button>

                <button className="bg-violet-500 p-2 rounded-xl mt-2"
                    type="button"
                    onClick={() => {
                        aiGenerate();
                    }}
                    disabled={generating}
                >
                    {generating ? "Generating..." : "AI Generate"}
                </button>
                <button className="bg-rose-500 p-2 rounded-xl mt-2"
                    type="button"
                    onClick={() => {
                        deleteText();
                    }}
                    disabled={deleting}
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </form>
    );
}