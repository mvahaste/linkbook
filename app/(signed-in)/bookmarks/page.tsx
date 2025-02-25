"use client";

import BookmarkComponent from "@/components/bookmark";
import { Skeleton } from "@/components/ui/skeleton";
import { getBookmarks } from "@/lib/api";
import { Bookmark } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BookmarksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    getBookmarks()
      .then((bookmarks) => {
        setBookmarks(bookmarks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Loading */}
        {isLoading && (
          <>
            <Skeleton className="h-20" />
            <Skeleton className="h-20 opacity-75" />
            <Skeleton className="h-20 opacity-50" />
            <Skeleton className="h-20 opacity-25" />
          </>
        )}
        {/* Error */}
        {!isLoading && error && (
          <p className="rounded-2xl bg-destructive px-4 py-2 text-sm text-destructive-foreground">
            <span className="font-semibold">Error: </span>
            {error.message}
          </p>
        )}
        {/* No bookmarks */}
        {!isLoading && bookmarks.length === 0 && (
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm text-muted-foreground">
            You don't have any bookmarks yet.
          </p>
        )}
        {/* Bookmarks */}
        {!isLoading &&
          bookmarks.length > 0 &&
          bookmarks.map((bookmark) => (
            <BookmarkComponent key={bookmark.id} bookmark={bookmark} />
          ))}
      </div>
    </>
  );
}
