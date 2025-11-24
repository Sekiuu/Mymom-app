"use client";

import { use, useState } from "react";
import { api } from "@/lib/api";
import { userWithoutPassword } from "@/lib/schemas";
export default function PostCreateForm({ user_id, username }: { user_id?: string, username?: string }) {
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        // For now, we'll just log the content.
        // Later, this will be replaced with an API call.
        // console.log({ content });
        setSaving(true);
        if (!content.trim()) {
            setError("Content cannot be empty.");
            return;
        }
        try {
            const res = await api.post('/posts', {
                content: content,
                username: username || "",
                image: image,
                user_id: user_id || ""
            });
            if (!res.success) {
                throw new Error(res.message || "Failed to create post.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.message ?? "Failed to create post.");
            return;
        }
        finally {
            // alert(`New Post Created:\n${content}`);
            setContent(""); // Reset form field
            setImage("");
        }
        setSaving(false);
    };
    async function aiGenerate() {
        setError(null);
        setGenerating(true);
        try {
            const res = await api.get('/ai/prompt', {
                prompt: (content ? `Generate a text based on: ${content} (this is user input)` : "Generate a random text.") + ": for My Website Feed. My website is about sharing short texts and stories about dialy life. the Concept is to share my dialy life with some one you love to say that you're ok and doing good.\
                return only the text(about 10 - 12 words) content without any additional commentary or formatting.\
                and the language is in depend on the user's language that user input (if user use that go thai).(default to english)."
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

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a New Post</h2>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                        What's on your mind?
                    </label>
                    <button type="button" className={"mb-2 px-3 py-1 text-white rounded-full text-sm hover:bg-green-600 transition "
                        + (generating ? "bg-green-400 cursor-not-allowed" : "bg-green-500")
                    }
                        onClick={aiGenerate}
                        disabled={generating}>
                        <span>{generating ? "Generating..." : "AI Generate"}</span>
                    </button>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows={4}
                        required
                        placeholder="Share your thoughts with the world..."
                    />
                    <div>
                        <input type="text" value={image} onChange={(e) => { setImage(e.target.value) }}
                            placeholder="Image URL (optional)" className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className={(saving? "bg-blue-500 cursor-not-allowed " : "bg-blue-500 ") + "hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}
