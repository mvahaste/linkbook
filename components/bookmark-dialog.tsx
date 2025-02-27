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
import { LucideSave, LucideWebhook } from "lucide-react";
import { useState } from "react";
import isURL from "validator/lib/isURL";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./submit-button";
import { newBookmarkAction } from "@/app/actions";

interface BookmarkDialogProps {
  type: "new" | "edit";
  bookmark?: Bookmark;
}

export default function BookmarkDialog({
  type,
  bookmark,
}: BookmarkDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [url, setUrl] = useState(bookmark?.url ?? "");
  const [title, setTitle] = useState(bookmark?.title ?? "");
  const [description, setDescription] = useState(bookmark?.description ?? "");
  const [image, setImage] = useState(bookmark?.image ?? "");

  async function fetchMetadata(fetchUrl: string) {
    setIsLoading(true);

    const result = await fetch(`/api/fetchMetadata?url=${fetchUrl}`);

    if (!result.ok) {
      // TODO: Show error message or toast
      console.error("Failed to fetch metadata");
      setIsLoading(false);
      return;
    }

    const data = await result.json();

    if (data.title) setTitle(data.title);
    if (data.description) setDescription(data.description);
    if (data.image) setImage(data.image);

    setIsLoading(false);
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setUrl("");
          setTitle("");
          setDescription("");
          setImage("");
        }
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
        <form className="flex flex-col [&>input]:mb-3 [&>label]:mb-2 [&>textarea]:mb-3">
          <Label htmlFor="url">URL</Label>
          <Input
            disabled={isLoading}
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
            disabled={isLoading}
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            disabled={isLoading}
            name="description"
            placeholder="Description"
            rows={2}
            value={description}
            className="h-auto"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label htmlFor="image">Image URL</Label>
          <Input
            disabled={isLoading}
            name="image"
            type="url"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
            <SubmitButton
              variant="outline"
              className="gap-2"
              disabled={isLoading || !isURL(url)}
              isPending={isLoading}
              onClick={(e) => {
                e.preventDefault();
                fetchMetadata(url);
              }}
            >
              <LucideWebhook className="h-4 w-4" />
              Autofill
            </SubmitButton>
            <SubmitButton
              variant="default"
              disabled={isLoading || !isURL(url)}
              formAction={newBookmarkAction}
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
