import { FeedItem } from "./types";

export function truncate(value: string, limit = 120) {
  if (!value) return "";
  return value.length > limit ? `${value.slice(0, limit).trim()}…` : value;
}

export function formatTime(date?: string | number | null) {
  if (!date) return "just now";
  const dateObj = new Date(date);
  const diffMs = Date.now() - dateObj.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return dateObj.toLocaleDateString();
}

export function getAuthorName(item?: FeedItem, user_id?: string) {
  if (!item) return "Anonymous";
  const name = item.username || item.user_id || "Anonymous";
  return item.user_id === user_id ? "You" : name;
}

