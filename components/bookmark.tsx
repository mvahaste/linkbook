import { Bookmark, titleToAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { LucideEllipsisVertical } from "lucide-react";
import Link from "next/link";

interface BookmarkComponentProps {
  bookmark: Bookmark;
}

export default function BookmarkComponent({
  bookmark,
}: BookmarkComponentProps) {
  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      key={bookmark.id}
      className="flex flex-row gap-4 rounded-2xl border p-4 transition-colors duration-150 ease-in-out hover:cursor-pointer hover:bg-muted"
      // onClick={() => window.open(bookmark.url, "_blank", "noopener,noreferrer")}
    >
      <Avatar className="h-11 w-11 text-lg">
        <AvatarImage src={bookmark.image} />
        <AvatarFallback className="border">
          {titleToAvatar(bookmark.title)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-grow flex-col">
        <h2 className="line-clamp-1">{bookmark.title}</h2>
        <p className="line-clamp-1 break-all text-sm text-muted-foreground">
          {bookmark.description}
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
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8"
        onClick={(e) => e.preventDefault()}
      >
        <LucideEllipsisVertical className="h-4 w-4" />
      </Button>
    </a>
  );
}
