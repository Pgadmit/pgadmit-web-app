"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileSearchBarProps {
  onSearch: (query: string) => void;
  onFiltersClick: () => void;
  placeholder?: string;
  className?: string;
  showFiltersButton?: boolean;
}

export function MobileSearchBar({
  onSearch,
  onFiltersClick,
  placeholder = "Search universities, programs...",
  className,
  showFiltersButton = true,
}: MobileSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={cn("flex gap-2 w-full max-w-full overflow-hidden", className)}>
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4 w-full"
        />
      </div>

      {showFiltersButton && (
        <Button
          variant="outline"
          size="icon"
          onClick={onFiltersClick}
          className="flex-shrink-0"
        >
          <Filter className="h-4 w-4" />
        </Button>
      )}

      <Button
        onClick={handleSearch}
        className="flex-shrink-0"
        size="sm"
      >
        Search
      </Button>
    </div>
  );
}