import { Bookmark } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  LucideSave,
  LucideSparkles,
  LucideWandSparkles,
  LucideWebhook,
} from "lucide-react";
import { useState } from "react";
import isURL from "validator/lib/isURL";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./submit-button";
import { editBookmarkAction, newBookmarkAction } from "@/app/actions";

interface BookmarkDialogProps {
  type: "new" | "edit";
  bookmark?: Bookmark;
  onNewOrEdit?: () => void;
}

export default function BookmarkDialog({
  type,
  bookmark,
  onNewOrEdit,
}: BookmarkDialogProps) {
  const [loading, setLoading] = useState<null | "fetch" | "submit">(null);

  const [isOpen, setIsOpen] = useState(false);

  const [url, setUrl] = useState(bookmark?.url ?? "");
  const [title, setTitle] = useState(bookmark?.title ?? "");
  const [description, setDescription] = useState(bookmark?.description ?? "");
  const [image, setImage] = useState(bookmark?.image ?? "");

  async function fetchMetadata(fetchUrl: string) {
    setLoading("fetch");

    const result = await fetch(`/api/fetchMetadata?url=${fetchUrl}`);

    if (!result.ok) {
      // TODO: Show error message or toast
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

    onNewOrEdit?.();
    setLoading(null);
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setUrl("");
          setTitle("");
          setDescription("");
          setImage("");
        }

        setIsOpen(open);
      }}
    >
      <DialogTrigger>Open</DialogTrigger>
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
            onChange={(e) => {
              setUrl(e.target.value);
            }}
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
