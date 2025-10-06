"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, X, Search, MapPin, DollarSign, GraduationCap, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterState {
  search: string;
  country: string;
  tuitionRange: string;
  ranking: string;
  program: string;
  deadline: string;
  applicationStatus: string[];
}

interface MobileFiltersDrawerProps {
  onFiltersChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
  className?: string;
}

export function MobileFiltersDrawer({
  onFiltersChange,
  initialFilters = {},
  className
}: MobileFiltersDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    country: "",
    tuitionRange: "",
    ranking: "",
    program: "",
    deadline: "",
    applicationStatus: [],
    ...initialFilters,
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleStatusToggle = (status: string) => {
    const newStatus = filters.applicationStatus.includes(status)
      ? filters.applicationStatus.filter(s => s !== status)
      : [...filters.applicationStatus, status];
    handleFilterChange("applicationStatus", newStatus);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      country: "",
      tuitionRange: "",
      ranking: "",
      program: "",
      deadline: "",
      applicationStatus: [],
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value =>
    Array.isArray(value) ? value.length > 0 : value !== ""
  ).length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn("relative min-w-0 flex-shrink-0", className)}
          size="sm"
        >
          <Filter className="h-4 w-4 mr-2" />
          <span className="truncate">Filters</span>
          {activeFiltersCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[85vh] p-0 w-full max-w-full overflow-x-hidden [&>button]:hidden">
        <SheetHeader className="p-4 border-b w-full">
          <div className="flex items-center justify-between w-full">
            <SheetTitle className="text-lg font-semibold truncate">Filters</SheetTitle>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                Clear all
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 w-full">
          {/* Search */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search universities, programs..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Country</Label>
            <Select value={filters.country} onValueChange={(value) => handleFilterChange("country", value)}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <SelectValue placeholder="Select country" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="netherlands">Netherlands</SelectItem>
                <SelectItem value="singapore">Singapore</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tuition Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tuition Range</Label>
            <Select value={filters.tuitionRange} onValueChange={(value) => handleFilterChange("tuitionRange", value)}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <SelectValue placeholder="Select range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-10k">Under $10,000</SelectItem>
                <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="over-100k">Over $100,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Program */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Program</Label>
            <Select value={filters.program} onValueChange={(value) => handleFilterChange("program", value)}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <SelectValue placeholder="Select program" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="arts">Arts & Humanities</SelectItem>
                <SelectItem value="sciences">Sciences</SelectItem>
                <SelectItem value="law">Law</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Application Status */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Application Status</Label>
            <div className="space-y-2">
              {[
                { value: "not-started", label: "Not Started" },
                { value: "in-progress", label: "In Progress" },
                { value: "submitted", label: "Submitted" },
                { value: "under-review", label: "Under Review" },
                { value: "accepted", label: "Accepted" },
                { value: "rejected", label: "Rejected" },
                { value: "waitlisted", label: "Waitlisted" },
              ].map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={status.value}
                    checked={filters.applicationStatus.includes(status.value)}
                    onCheckedChange={() => handleStatusToggle(status.value)}
                  />
                  <Label
                    htmlFor={status.value}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {status.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Deadline</Label>
            <Select value={filters.deadline} onValueChange={(value) => handleFilterChange("deadline", value)}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <SelectValue placeholder="Select deadline" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="next-month">Next Month</SelectItem>
                <SelectItem value="next-3-months">Next 3 Months</SelectItem>
                <SelectItem value="next-6-months">Next 6 Months</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-background w-full">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1 min-w-0"
              onClick={clearFilters}
            >
              <span className="truncate">Clear All</span>
            </Button>
            <Button
              className="flex-1 min-w-0"
              onClick={() => setIsOpen(false)}
            >
              <span className="truncate">Apply Filters</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
