"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import { FeedCard } from "./components/FeedCard";
import { FilterBar, FilterOption } from "./components/FilterBar";
import { FeedItem } from "./types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { ImageModal } from "../components/ImageModal";
import { EmptyState } from "../components/EmptyState";
import { RefreshButton } from "../components/RefreshButton";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { UserButton } from "../components";
import PostCreateForm from "../components/PostCreateForm";
import { useSession } from "next-auth/react";

const FILTERS: readonly FilterOption[] = [
  { id: "all", label: "All moments" },
  { id: "photos", label: "Photo stories" },
  { id: "notes", label: "Notebook" },
] as const;

export default function Feeder() {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]["id"]>("all");
  const { data: session } = useSession();

  const loadFeeds = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.get("/posts");
      const data = res?.data ?? [];
      if (!Array.isArray(data)) throw new Error("Unexpected response");
      const sorted = (data as FeedItem[]).sort((a, b) => {
        const aTime = new Date(a.create_at ?? 0).getTime();
        const bTime = new Date(b.create_at ?? 0).getTime();
        return bTime - aTime;
      });
      setFeeds(sorted);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Failed to load feed");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadFeeds();
  }, [loadFeeds]);

  const filteredFeeds = useMemo(() => {
    if (activeFilter === "photos") {
      return feeds.filter((item) => Boolean(item.image));
    }
    if (activeFilter === "notes") {
      return feeds.filter((item) => !item.image);
    }
    return feeds;
  }, [feeds, activeFilter]);

  const visible = filteredFeeds.slice(0, visibleCount);

  async function handleRefresh() {
    setRefreshing(true);
    setVisibleCount(6);
    await loadFeeds();
  }

  return (
    <main className="min-h-screen">
      <UserButton />
      <div className="grid grid-cols-3 mx-auto">
        <PostCreateForm user_id={session?.user?.id} username={session?.user?.username} />
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">

          <FilterBar
            filters={FILTERS}
            activeFilter={activeFilter}
            onChange={(filterId) => {
              setActiveFilter(filterId);
              setVisibleCount(6);
            }}
            count={filteredFeeds.length}
          />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {error && <ErrorMessage message={error} onRetry={handleRefresh} />}
            <RefreshButton onClick={handleRefresh} refreshing={refreshing} className="self-start md:self-auto" />
          </div>

          {loading && <LoadingSpinner />}

          {!loading && !filteredFeeds.length && (
            <EmptyState
              title="Nothing in this lane yet"
              description="Switch filters or be the first to share a moment."
            />
          )}

          <div className="space-y-6">
            {visible.map((item) => (
              <FeedCard
                key={item.id ?? item.content}
                item={item}
                user_id={session?.user?.id}
                onSelectImage={(url) => setSelectedImage(url ?? null)}
              />
            ))}
          </div>

          {visibleCount < filteredFeeds.length && (
            <LoadMoreButton onClick={() => setVisibleCount((c) => c + 4)} />
          )}
        </div>
      </div>

      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </main>
  );
}
