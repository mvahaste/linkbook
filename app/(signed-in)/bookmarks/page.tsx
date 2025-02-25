"use client";

import BookmarkComponent from "@/components/bookmark";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getBookmarks } from "@/lib/api";
import { Bookmark } from "@/lib/utils";
import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookmarksPage() {
  const { bookmarks, status, error } = useBookmarks();

  if (status === "loading") return <LoadingSkeleton />;
  if (status === "error") return <ErrorMessage error={error} />;
  if (bookmarks.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search..." type="search" />
        </div>
        <div className="flex items-center gap-2">
          <p className="flex-grow text-sm text-muted-foreground">3 results</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value="recent">
                <DropdownMenuRadioItem value="recent">
                  Most Recent
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  Oldest First
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="az">
                  Title A-Z
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="za">
                  Title Z-A
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
