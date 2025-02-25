import { LucideArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface SortDropdownProps {
  value: "az" | "za" | "new" | "old";
  onChangeAction: (sort: "az" | "za" | "new" | "old") => void;
}

export default function SortDropdown({
  value,
  onChangeAction,
}: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <LucideArrowUpDown className="h-4 w-4" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(val) =>
            onChangeAction(val as SortDropdownProps["value"])
          }
        >
          <DropdownMenuRadioItem value="az">Title A-Z</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="za">Title Z-A</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="new">
            Newest First
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="old">
            Oldest First
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
