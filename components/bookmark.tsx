import { Bookmark, titleToAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  LucideEllipsisVertical,
  LucidePencil,
  LucideTrash,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { deleteBookmarkAction } from "@/app/actions";
import { useState } from "react";

interface BookmarkComponentProps {
  bookmark: Bookmark;
}

export default function BookmarkComponent({
  bookmark,
}: BookmarkComponentProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      key={bookmark.id}
      className="flex flex-row gap-4 rounded-2xl border p-4 transition-colors duration-150 ease-in-out hover:cursor-pointer hover:bg-muted"
    >
      <Avatar className="h-11 w-11 text-lg">
        <AvatarImage src={bookmark.image} className="object-cover" />
        <AvatarFallback className="border">
          {titleToAvatar(bookmark.title)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-grow flex-col">
        <h2 className="line-clamp-1">{bookmark.title}</h2>
        <p className="text-sm text-muted-foreground">
          {bookmark.description || bookmark.url}
        </p>
        <div className="mt-1 flex-wrap gap-2">
          {bookmark.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-muted px-2.5 py-1 text-xs"
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <LucideEllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="gap-2">
            <LucidePencil className="h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            onSelect={() => {
              setIsVisible(false);

              const success = deleteBookmarkAction(bookmark.id);

              if (!success) {
                setIsVisible(true);
              }
            }}
          >
            <LucideTrash className="h-4 w-4 text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Button */}
      {/*   size="icon" */}
      {/*   variant="ghost" */}
      {/*   className="h-8 w-8" */}
      {/*   onClick={(e) => e.preventDefault()} */}
      {/* > */}
      {/*   <LucideEllipsisVertical className="h-4 w-4" /> */}
      {/* </Button> */}
    </a>
  );
}
