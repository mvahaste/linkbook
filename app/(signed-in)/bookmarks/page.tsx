"use client";

import BookmarkComponent from "@/components/bookmark";
import FadingSkeletons from "@/components/fading-skeletons";
import SearchSortFilter from "@/components/search-sort-filter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookmarks, useTags } from "@/lib/useApi";
import { LucideX } from "lucide-react";
import { useState } from "react";

export default function BookmarksPage() {
  const {
    bookmarks,
    status: bookmarksStatus,
    error: bookmarksError,
  } = useBookmarks();
  const { tags, status: tagsStatus, error: tagsError } = useTags();

  return (
    <div className="flex flex-col gap-4">
      <SearchSortFilter filterTags={tags} />

      {bookmarksError && <ErrorMessage error={bookmarksError} />}
      {bookmarksStatus === "loading" && (
        <FadingSkeletons count={7} skeletonClassName="h-20" />
      )}
      {bookmarksStatus !== "loading" && bookmarks.length === 0 && (
        <EmptyState />
      )}

      {bookmarksStatus === "success" &&
        bookmarks.length > 0 &&
        bookmarks.map((bookmark) => (
          <BookmarkComponent key={bookmark.id} bookmark={bookmark} />
        ))}
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
