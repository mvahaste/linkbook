"use client";

import BookmarkComponent from "@/components/bookmark";
import { Skeleton } from "@/components/ui/skeleton";
import { getBookmarks } from "@/lib/api";
import { Bookmark } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BookmarksPage() {
  const { bookmarks, status, error } = useBookmarks();

  if (status === "loading") return <LoadingSkeleton />;
  if (status === "error") return <ErrorMessage error={error} />;
  if (bookmarks.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-col gap-4">
      {bookmarks.map((bookmark) => (
        <BookmarkComponent key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}

function useBookmarks() {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading",
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getBookmarks()
      .then((data) => {
        setBookmarks(data);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setStatus("error");
      });
  }, []);

  return { bookmarks, status, error };
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className={`h-20 opacity-${100 - i * 25}`} />
      ))}
    </div>
  );
}

function ErrorMessage({ error }: { error: Error | null }) {
  return (
    <p className="rounded-2xl bg-destructive px-4 py-2 text-sm text-destructive-foreground">
      <span className="font-semibold">Error: </span>
      {error?.message || "Something went wrong"}
    </p>
  );
}

function EmptyState() {
  return (
    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm text-muted-foreground">
      You don't have any bookmarks yet.
    </p>
  );
}
