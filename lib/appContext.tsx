"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Bookmark, Tag } from "@/lib/utils";
import { getBookmarks, getTags } from "@/lib/api";
import BookmarkDialog from "@/components/bookmark-dialog";
import TagDialog from "@/components/tag-dialog";

type DialogType = "new" | "edit" | null;
type DialogCategory = "bookmark" | "tag" | null;

interface AppContextProps {
  bookmarks: Bookmark[];
  tags: Tag[];
  status: "loading" | "error" | "success";
  error: Error | null;
  refreshBookmarks: () => void;
  refreshTags: () => void;
  deleteBookmark: (id: number) => void;
  deleteTag: (id: number) => void;
  openDialog: (
    category: DialogCategory,
    type: DialogType,
    item?: Bookmark | Tag,
  ) => void;
  closeDialog: () => void;
  dialog: {
    isOpen: boolean;
    category: DialogCategory;
    type: DialogType;
    item?: Bookmark | Tag;
  };
}

const AppContext = createContext<AppContextProps | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading",
  );
  const [error, setError] = useState<Error | null>(null);

  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    category: DialogCategory;
    type: DialogType;
    item?: Bookmark | Tag;
  }>({
    isOpen: false,
    category: null,
    type: null,
    item: undefined,
  });

  // Fetch bookmarks
  const fetchBookmarks = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await getBookmarks();
      setBookmarks(data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setError(err as Error);
      setStatus("error");
    }
  }, []);

  // Fetch tags
  const fetchTags = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await getTags();
      setTags(data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setError(err as Error);
      setStatus("error");
    }
  }, []);

  const deleteBookmark = (id: number) => {
    setBookmarks((bookmarks) => bookmarks.filter((b) => b.id !== id));
  };

  const deleteTag = (id: number) => {
    setTags((tags) => tags.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchBookmarks();
    fetchTags();
  }, [fetchBookmarks, fetchTags]);

  // Dialog functions
  function openDialog(
    category: DialogCategory,
    type: DialogType,
    item?: Bookmark | Tag,
  ) {
    setDialog({ isOpen: true, category, type, item });
  }

  function closeDialog() {
    setDialog({ isOpen: false, category: null, type: null, item: undefined });
  }

  return (
    <AppContext.Provider
      value={{
        bookmarks,
        tags,
        status,
        error,
        refreshBookmarks: fetchBookmarks,
        refreshTags: fetchTags,
        deleteBookmark,
        deleteTag,
        openDialog,
        closeDialog,
        dialog,
      }}
    >
      {children}

      {dialog.isOpen && dialog.category === "bookmark" && (
        <BookmarkDialog
          type={dialog.type || "new"}
          bookmark={dialog.item as Bookmark}
          isOpen={dialog.isOpen}
          onClose={closeDialog}
        />
      )}

      {dialog.isOpen && dialog.category === "tag" && (
        <TagDialog
          type={dialog.type || "new"}
          tag={dialog.item as Tag}
          isOpen={dialog.isOpen}
          onClose={closeDialog}
        />
      )}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
