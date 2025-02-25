"use client";

import { useEffect, useState } from "react";
import { Bookmark, Tag } from "./utils";
import { getBookmarks, getTags } from "./api";

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

export function useBookmarks() {
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
