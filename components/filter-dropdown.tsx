import { LucideSlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Tag } from "@/lib/utils";

interface FilterDropdownProps {
  filterTags: Tag[];
  selected: number[];
  onChange: (selected: number[]) => void;
}

export default function FilterDropdown({
  filterTags,
  selected,
  onChange,
}: FilterDropdownProps) {
  const handleToggle = (tagId: number) => {
    const newSelection = selected.includes(tagId)
      ? selected.filter((id) => id !== tagId)
      : [...selected, tagId];
    onChange(newSelection);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <LucideSlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-72 overflow-scroll">
        <DropdownMenuCheckboxItem
          checked={selected.length === 0}
          onCheckedChange={() => onChange([])}
          onSelect={(event) => event.preventDefault()}
        >
          All
        </DropdownMenuCheckboxItem>
        {filterTags
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag.id}
              checked={selected.includes(tag.id)}
              onCheckedChange={() => handleToggle(tag.id)}
              onSelect={(event) => event.preventDefault()}
            >
              {tag.label}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
