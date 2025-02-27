"use client";

import { createContext, useContext } from "react";
import { useBookmarks } from "@/lib/useBookmarks";
import { Bookmark } from "@/lib/utils";

const BookmarksContext = createContext<{
  bookmarks: Bookmark[];
  status: "loading" | "error" | "success";
  error: Error | null;
  refresh: () => void;
} | null>(null);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const bookmarksState = useBookmarks();

  return (
    <BookmarksContext.Provider value={bookmarksState}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksProvider",
    );
  }
  return context;
}
