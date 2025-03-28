import { useRef, useState } from "react";
import { LucideRotateCcw, LucideSearch } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tag } from "@/lib/utils";
import SortDropdown from "./sort-dropdown";
import FilterDropdown from "./filter-dropdown";
import { useShortcuts } from "@/lib/useShortcuts";

interface SearchSortFilterProps {
  placeholder?: string;
  onSearchChange?: (search: string) => void;
  onSortChange?: (sort: "az" | "za" | "new" | "old") => void;
  sortDisabled?: boolean;
  defaultSort?: "az" | "za" | "new" | "old";
  onFilterChange?: (filter: Tag[]) => void;
  filterTags?: Tag[];
  filterDisabled?: boolean;
}

export default function SearchSortFilter({
  placeholder = "Type to search...",
  onSearchChange,
  onSortChange,
  sortDisabled,
  defaultSort,
  onFilterChange,
  filterTags = [],
  filterDisabled,
}: SearchSortFilterProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"az" | "za" | "new" | "old">(
    defaultSort ?? "az",
  );
  const [filter, setFilter] = useState<number[]>([]);

  const searchRef = useRef<HTMLInputElement>(null);

  useShortcuts({
    "/": () => searchRef.current?.focus(),
  });

  const handleSearchChange = (search: string) => {
    setSearch(search);
    onSearchChange?.(search);
  };

  const handleSortChange = (sort: "az" | "za" | "new" | "old") => {
    setSort(sort);
    onSortChange?.(sort);
  };

  const handleFilterChange = (selectedTags: number[]) => {
    setFilter(selectedTags);
    onFilterChange?.(filterTags.filter((tag) => selectedTags.includes(tag.id)));
  };

  const handleClear = () => {
    setSearch("");
    setSort("az");
    setFilter([]);
    onSearchChange?.("");
    onSortChange?.("az");
    onFilterChange?.([]);
  };

  return (
    <div
      className={`${!filterDisabled || !sortDisabled ? "flex-col" : ""} flex gap-2 sm:flex-row`}
    >
      {/* Search */}
      <div className="relative flex-1">
        <LucideSearch className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          ref={searchRef}
          className="pl-10"
          placeholder={placeholder}
          type="search"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Sort & Filter */}
      <div className="flex flex-row gap-2">
        {!filterDisabled && (
          <FilterDropdown
            filterTags={filterTags}
            selected={filter}
            onChangeAction={handleFilterChange}
          />
        )}
        {!sortDisabled && (
          <SortDropdown value={sort} onChangeAction={handleSortChange} />
        )}
        {(!filterDisabled || !sortDisabled) && (
          <div className="block flex-grow sm:hidden" />
        )}
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleClear}
        >
          <LucideRotateCcw className="h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
