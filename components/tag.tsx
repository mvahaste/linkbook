import { Tag } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  LucideEllipsisVertical,
  LucidePencil,
  LucideTrash,
} from "lucide-react";
import { useAppContext } from "@/lib/appContext";
import { useState } from "react";
import { deleteTagAction } from "@/app/actions";

interface TagComponentProps {
  tag: Tag;
}

export default function TagComponent({ tag }: TagComponentProps) {
  const { openDialog, refreshTags } = useAppContext();

  const [isVisible, setIsVisible] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      key={tag.id}
      className={`relative flex flex-row items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-150 ease-in-out hover:cursor-pointer hover:bg-muted ${
        isDeleting ? "opacity-0" : "opacity-100"
      } `}
    >
      {/* <div className="ml-1 h-3 w-3 rounded-full bg-red-500" /> */}
      <div className="flex flex-grow flex-col">
        <h2 className="line-clamp-1">{tag.label}</h2>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-8 w-8"
          >
            <LucideEllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="gap-2"
            onSelect={() => {
              openDialog("tag", "edit", tag);
            }}
          >
            <LucidePencil className="h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            onSelect={async () => {
              setIsDeleting(true);
              setTimeout(async () => {
                const { success } = await deleteTagAction(tag.id);
                if (!success) {
                  setIsDeleting(false);
                } else {
                  setIsVisible(false);
                  refreshTags();
                }
              }, 150); // Matches transition duration
            }}
          >
            <LucideTrash className="h-4 w-4 text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
