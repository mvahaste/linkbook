import { Tag } from "@/lib/utils";
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
import { SubmitButton } from "./submit-button";
import { editTagAction, newTagAction } from "@/app/actions";
import { useAppContext } from "@/lib/appContext";

interface TagDialogProps {
  type: "new" | "edit";
  tag?: Tag;
  isOpen: boolean;
  onClose: () => void;
}

export default function TagDialog({
  type,
  tag,
  isOpen,
  onClose,
}: TagDialogProps) {
  const { refreshTags } = useAppContext();
  const [loading, setLoading] = useState<null | "fetch" | "submit">(null);

  const [label, setLabel] = useState("");

  // Reset fields when tag changes
  useEffect(() => {
    if (tag) {
      setLabel(tag.label);
    } else {
      clearFields();
    }
  }, [tag]);

  function clearFields() {
    setLabel("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading("submit");

    const formData = new FormData(e.currentTarget);

    const { error } = await (type === "new"
      ? newTagAction(formData)
      : editTagAction(formData));

    if (error) {
      console.error(error);
      setLoading(null);
      return;
    }

    refreshTags();
    setLoading(null);
    clearFields();
    onClose(); // Close dialog after successful save
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type === "new" ? "New" : "Edit"} Tag</DialogTitle>
          <DialogDescription>
            {type === "new"
              ? "Add a new tag to your collection."
              : "Edit your tag."}
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col [&>input]:mb-3 [&>label]:mb-2 [&>textarea]:mb-3"
          onSubmit={handleSubmit}
        >
          {type === "edit" && <input type="hidden" name="id" value={tag?.id} />}
          <Label htmlFor="label">Label</Label>
          <Input
            disabled={loading !== null}
            required
            name="label"
            type="text"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <SubmitButton
            className="w-full self-end sm:w-fit"
            variant="default"
            disabled={loading !== null}
            isPending={loading === "submit"}
          >
            <LucideSave className="h-4 w-4" />
            Save
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
