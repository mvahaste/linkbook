"use client";

import { LucideCheck, LucideTags } from "lucide-react";
import { Button } from "./ui/button";
import { cn, Tag } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useState } from "react";

interface FilterDropdownProps {
  filterTags: Tag[];
  selected: number[];
  onChangeAction: (selected: number[]) => void;
}

export default function FilterDropdown({
  filterTags,
  selected,
  onChangeAction,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (tagId: number) => {
    if (tagId === -1) {
      onChangeAction([]);

      return;
    }

    const newSelection = selected.includes(tagId)
      ? selected.filter((id) => id !== tagId)
      : [...selected, tagId];
    onChangeAction(newSelection);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="flex gap-2"
        >
          <LucideTags className="h-4 w-4" />
          Tags
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="all" onSelect={() => handleToggle(-1)}>
                <LucideCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.length === 0 ? "opacity-100" : "opacity-0",
                  )}
                />
                All
              </CommandItem>
              {filterTags
                .sort((a: Tag, b: Tag) => {
                  return a.label.localeCompare(b.label);
                })
                .map((tag) => (
                  <CommandItem
                    key={tag.id}
                    value={tag.label} // Ensure the value is a string (consistent with CommandItem's expectations)
                    onSelect={() => handleToggle(tag.id)} // Handle toggle on selection
                  >
                    <LucideCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(tag.id) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {tag.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
