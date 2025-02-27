"use client";

import FadingSkeletons from "@/components/fading-skeletons";
import SearchSortFilter from "@/components/search-sort-filter";
import TagComponent from "@/components/tag";
import { Button } from "@/components/ui/button";
import { searchedTags, sortedTags, useTags } from "@/lib/useTags";
import { Tag } from "@/lib/utils";
import { LucideX } from "lucide-react";
import { useState } from "react";

export default function TagsPage() {
  const { tags, status, error } = useTags();

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"az" | "za" | "new" | "old">("az");

  return (
    <div className="flex flex-col gap-4">
      <SearchSortFilter
        filterDisabled
        onSearchChange={setQuery}
        onSortChange={setSortBy}
        defaultSort={sortBy}
      />
      {error && <ErrorMessage error={error} />}
      {status === "loading" && <FadingSkeletons count={8} />}
      {status !== "loading" && tags.length === 0 && <EmptyState />}
      {status === "success" &&
        tags.length > 0 &&
        sortedTags(searchedTags(tags, query), sortBy).map((tag: Tag) => (
          <TagComponent key={tag.id} tag={tag} />
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
      You don't have any tags yet.
    </p>
  );
}
