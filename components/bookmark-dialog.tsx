import { Bookmark } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { LucideSave, LucideWandSparkles } from "lucide-react";
import { useState, useEffect } from "react";
import isURL from "validator/lib/isURL";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./submit-button";
import { editBookmarkAction, newBookmarkAction } from "@/app/actions";
import { useBookmarksContext } from "@/lib/bookmarksContext";

interface BookmarkDialogProps {
  type: "new" | "edit";
  bookmark?: Bookmark;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookmarkDialog({
  type,
  bookmark,
  isOpen,
  onClose,
}: BookmarkDialogProps) {
  const { refresh } = useBookmarksContext();
  const [loading, setLoading] = useState<null | "fetch" | "submit">(null);

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Reset fields when bookmark changes
  useEffect(() => {
    if (bookmark) {
      setUrl(bookmark.url);
      setTitle(bookmark.title);
      setDescription(bookmark.description ?? "");
      setImage(bookmark.image ?? "");
    } else {
      clearFields();
    }
  }, [bookmark]);

  function clearFields() {
    setUrl("");
    setTitle("");
    setDescription("");
    setImage("");
  }

  async function fetchMetadata(fetchUrl: string) {
    setLoading("fetch");

    const result = await fetch(`/api/fetchMetadata?url=${fetchUrl}`);

    if (!result.ok) {
      console.error("Failed to fetch metadata");
      setLoading(null);
      return;
    }

    const data = await result.json();
    setTitle(data.title ?? "");
    setDescription(data.description ?? "");
    setImage(data.image ?? "");
    setLoading(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading("submit");

    const formData = new FormData(e.currentTarget);

    const { error } = await (type === "new"
      ? newBookmarkAction(formData)
      : editBookmarkAction(formData));

    if (error) {
      console.error(error);
      setLoading(null);
      return;
    }

    refresh();
    setLoading(null);
    clearFields();
    onClose(); // Close dialog after successful save
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type === "new" ? "New" : "Edit"} Bookmark</DialogTitle>
          <DialogDescription>
            {type === "new"
              ? "Add a new bookmark to your collection."
              : "Edit your bookmark details."}
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col [&>input]:mb-3 [&>label]:mb-2 [&>textarea]:mb-3"
          onSubmit={handleSubmit}
        >
          {type === "edit" && (
            <input type="hidden" name="id" value={bookmark?.id} />
          )}
          <Label htmlFor="url">URL</Label>
          <Input
            disabled={loading !== null}
            required
            name="url"
            type="url"
            placeholder="URL"
            value={url}
            onPaste={(e) => {
              const pasted = e.clipboardData.getData("text/plain");
              if (isURL(pasted)) {
                e.currentTarget.value = "";
                fetchMetadata(pasted);
              }
            }}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Label htmlFor="title">Title</Label>
          <Input
            disabled={loading !== null}
            required
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            disabled={loading !== null}
            name="description"
            placeholder="Description"
            rows={2}
            value={description}
            className="h-auto text-sm"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label htmlFor="image">Image URL</Label>
          <Input
            disabled={loading !== null}
            name="image"
            type="url"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
            <SubmitButton
              variant="outline"
              disabled={loading !== null || !isURL(url)}
              isPending={loading === "fetch"}
              onClick={(e) => {
                e.preventDefault();
                fetchMetadata(url);
              }}
            >
              <LucideWandSparkles className="h-4 w-4" />
              Autofill
            </SubmitButton>
            <SubmitButton
              variant="default"
              disabled={loading !== null || !isURL(url)}
              isPending={loading === "submit"}
            >
              <LucideSave className="h-4 w-4" />
              Save
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
