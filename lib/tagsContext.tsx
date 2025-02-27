"use client";

import { createContext, useContext } from "react";
import { Tag } from "./utils";
import { useTags } from "./useTags";

const TagsContext = createContext<{
  tags: Tag[];
  status: "loading" | "error" | "success";
  error: Error | null;
  refresh: () => void;
} | null>(null);

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const tagsState = useTags();

  return (
    <TagsContext.Provider value={tagsState}>{children}</TagsContext.Provider>
  );
}

export function useTagsContext() {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksProvider",
    );
  }
  return context;
}
