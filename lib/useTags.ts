"use client";

import { useEffect, useState } from "react";
import { Tag } from "./utils";
import { getTags } from "./api";

export function useTags() {
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

export function searchedTags(tags: Tag[], query: string): Tag[] {
  query = query.trim();

  if (query === "") {
    return tags;
  }

  return tags.filter((tag) =>
    tag.label.toLowerCase().includes(query.toLowerCase()),
  );
}

export function sortedTags(tags: Tag[], sortBy: string): Tag[] {
  return tags.sort((a, b) => {
    if (sortBy === "az") {
      return a.label.localeCompare(b.label);
    } else if (sortBy === "za") {
      return b.label.localeCompare(a.label);
    } else if (sortBy === "new") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "old") {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }

    return 0;
  });
}
