"use client";

import BookmarkComponent from "@/components/bookmark";
import FadingSkeletons from "@/components/fading-skeletons";
import NewButton from "@/components/new-button";
import SearchSortFilter from "@/components/search-sort-filter";
import { Button } from "@/components/ui/button";
import { AppProvider, useAppContext } from "@/lib/appContext";
import {
  filteredBookmarks,
  searchedBookmarks,
  sortedBookmarks,
} from "@/lib/useBookmarks";
import { Bookmark, Tag } from "@/lib/utils";
import { LucideX } from "lucide-react";
import { useState } from "react";

export default function BookmarksPage() {
  return (
    <AppProvider>
      <BookmarksContent />
    </AppProvider>
  );
}

function BookmarksContent() {
  const {
    bookmarks,
    status: bookmarksStatus,
    error: bookmarksError,
    tags,
    openDialog,
  } = useAppContext();

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"az" | "za" | "new" | "old">("az");
  const [filterTags, setFilterTags] = useState<Tag[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <SearchSortFilter
        filterTags={tags}
        onSearchChange={setQuery}
        onSortChange={setSortBy}
        defaultSort={sortBy}
        onFilterChange={setFilterTags}
      />

      {bookmarksError && <ErrorMessage error={bookmarksError} />}
      {bookmarksStatus === "loading" && (
        <FadingSkeletons count={7} skeletonClassName="h-20" />
      )}
      {bookmarksStatus !== "loading" && bookmarks.length === 0 && (
        <EmptyState />
      )}

      {bookmarksStatus === "success" &&
        bookmarks.length > 0 &&
        sortedBookmarks(
          filteredBookmarks(searchedBookmarks(bookmarks, query), filterTags),
          sortBy,
        ).map((bookmark: Bookmark) => (
          <BookmarkComponent key={bookmark.id} bookmark={bookmark} />
        ))}
      <NewButton onClick={() => openDialog("bookmark", "new")} />
    </div>
  );
}

function ErrorMessage({ error }: { error: Error | null }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative flex gap-4 rounded-2xl border bg-destructive px-5 py-3 text-destructive-foreground">
      <div className="mr-5 flex flex-grow flex-col gap-1">
        <small className="text-sm">
          <strong>Error: </strong>
          {error?.message || "Something went wrong."}
        </small>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="absolute right-0 top-1 text-destructive-foreground hover:bg-transparent hover:text-destructive-foreground"
        onClick={() => setIsVisible(false)}
      >
        <LucideX />
      </Button>
    </div>
  );
}

function EmptyState() {
  return (
    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm text-muted-foreground">
      You don't have any bookmarks yet.
    </p>
  );
}
