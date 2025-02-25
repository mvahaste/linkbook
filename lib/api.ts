"use client";

import supabase from "./supabaseClient";
import { Bookmark, Tag } from "./utils";

export async function getBookmarks(): Promise<Bookmark[]> {
  // Fetch bookmarks along with associated tags
  const { data, error } = await supabase
    .from("bookmarks")
    .select(
      `
      id, url, title, description, image, created_at,
      bookmark_to_tag(tag_id), tags(id, label, color, created_at)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error fetching bookmarks: ${error.message}`);
  }

  // Map and transform the data into Bookmark format
  return (
    data?.map((bookmark: any) => ({
      ...bookmark,
      created_at: new Date(bookmark.created_at), // Convert string to Date
      tags: bookmark.tags
        ? bookmark.tags.map((tag: any) => ({
            ...tag,
            created_at: new Date(tag.created_at), // Convert string to Date
          }))
        : [],
    })) || []
  );
}

export async function getTags(): Promise<Tag[]> {
  // Fetch tags
  const { data, error } = await supabase.from("tags").select("*");

  if (error) {
    throw new Error(`Error fetching tags: ${error.message}`);
  }

  // Map and transform the data into Tag format
  return (
    data?.map((tag: any) => ({
      ...tag,
      created_at: new Date(tag.created_at), // Convert string to Date
    })) || []
  );
}
