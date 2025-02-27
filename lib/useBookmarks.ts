"use client";

import { useCallback, useEffect, useState } from "react";
import { Bookmark, Tag } from "./utils";
import { getBookmarks } from "./api";

export function useBookmarks() {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading",
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchBookmarks = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await getBookmarks();
      setBookmarks(data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setError(err as Error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return { bookmarks, status, error, refresh: fetchBookmarks };
}

export function searchedBookmarks(
  bookmarks: Bookmark[],
  query: string,
): Bookmark[] {
  query = query.trim();

  if (query === "") {
    return bookmarks;
  }

  return bookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(query.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(query.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(query.toLowerCase()) ||
      bookmark.tags.some((tag) =>
        tag.label.toLowerCase().includes(query.toLowerCase()),
      ),
  );
}

export function filteredBookmarks(
  bookmarks: Bookmark[],
  tags: Tag[],
): Bookmark[] {
  if (tags.length === 0) {
    return bookmarks;
  }

  return bookmarks.filter((bookmark) =>
    bookmark.tags.some((tag) => tags.some((t) => t.id === tag.id)),
  );
}

export function sortedBookmarks(
  bookmarks: Bookmark[],
  sortBy: string,
): Bookmark[] {
  return bookmarks.sort((a, b) => {
    if (sortBy === "az") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "za") {
      return b.title.localeCompare(a.title);
    } else if (sortBy === "new") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "old") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    return 0;
  });
}
