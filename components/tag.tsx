import { Tag } from "@/lib/utils";

interface TagComponentProps {
  tag: Tag;
}

export default function TagComponent({ tag }: TagComponentProps) {
  return (
    <div
      key={tag.id}
      className="flex flex-row items-center gap-3 rounded-2xl border px-4 py-3 transition-colors duration-150 ease-in-out hover:cursor-pointer hover:bg-muted"
    >
      <div className="ml-1 h-3 w-3 rounded-full bg-red-500" />
      <div className="flex flex-grow flex-col">
        <h2 className="line-clamp-1">{tag.label}</h2>
      </div>
    </div>
  );
}
