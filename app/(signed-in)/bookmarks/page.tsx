"use client";

import BookmarkComponent from "@/components/bookmark";
import SearchSortFilter from "@/components/search-sort-filter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getBookmarks, getTags } from "@/lib/api";
import { Bookmark, Tag } from "@/lib/utils";
import { LucideX } from "lucide-react";
import { useEffect, useState } from "react";

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
      {bookmarksStatus === "loading" && <LoadingSkeleton />}
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

function useTags() {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading",
  );
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getTags()
      .then((data) => {
        setTags(data);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setStatus("error");
      });
  }, []);

  return { tags, status, error };
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
        <Skeleton key={i} className="h-20 opacity-75" />
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
