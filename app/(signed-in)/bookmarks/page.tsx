"use client";

import BookmarkComponent from "@/components/bookmark";
import SearchSortFilter from "@/components/search-sort-filter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getBookmarks } from "@/lib/api";
import { Bookmark, Tag } from "@/lib/utils";
import { LucideX } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookmarksPage() {
  const { bookmarks, status, error } = useBookmarks();

  const debugTags: Tag[] = [
    {
      id: 1,
      label: "JavaScript",
      color: "yellow",
      created_at: new Date(),
    },
    {
      id: 2,
      label: "React",
      color: "blue",
      created_at: new Date(),
    },
    {
      id: 3,
      label: "Next.js",
      color: "gray",
      created_at: new Date(),
    },
    {
      id: 4,
      label: "Tailwind CSS",
      color: "cyan",
      created_at: new Date(),
    },
    {
      id: 5,
      label: "TypeScript",
      color: "blue",
      created_at: new Date(),
    },
    {
      id: 6,
      label: "Node.js",
      color: "green",
      created_at: new Date(),
    },
    {
      id: 7,
      label: "GraphQL",
      color: "pink",
      created_at: new Date(),
    },
    {
      id: 8,
      label: "Deno",
      color: "black",
      created_at: new Date(),
    },
    {
      id: 9,
      label: "Svelte",
      color: "purple",
      created_at: new Date(),
    },
    {
      id: 10,
      label: "Vue.js",
      color: "green",
      created_at: new Date(),
    },
    {
      id: 11,
      label: "Angular",
      color: "red",
      created_at: new Date(),
    },
    {
      id: 12,
      label: "Sapper",
      color: "blue",
      created_at: new Date(),
    },
    {
      id: 13,
      label: "Nuxt.js",
      color: "green",
      created_at: new Date(),
    },
    {
      id: 14,
      label: "Gatsby",
      color: "purple",
      created_at: new Date(),
    },
    {
      id: 15,
      label: "Jamstack",
      color: "gray",
      created_at: new Date(),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <SearchSortFilter filterTags={debugTags} />

      {error && <ErrorMessage error={error} />}
      {status === "loading" && <LoadingSkeleton />}
      {status !== "loading" && bookmarks.length === 0 && <EmptyState />}

      {status === "success" &&
        bookmarks.length > 0 &&
        bookmarks.map((bookmark) => (
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
