import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Option {
  id: string;
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  placeholder?: string;
  maxSelections?: number;
  onSelectionChange?: (selected: Option[]) => void;
  className?: string;
}

export function MultiSelectDropdown({
  options,
  placeholder = "Select options...",
  maxSelections = 3,
  onSelectionChange,
  className,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle option selection/deselection
  const handleOptionToggle = (option: Option) => {
    const isSelected = selectedOptions.some(
      (selected) => selected.id === option.id
    );

    if (isSelected) {
      // Remove option
      const newSelected = selectedOptions.filter(
        (selected) => selected.id !== option.id
      );
      setSelectedOptions(newSelected);
      onSelectionChange?.(newSelected);
    } else if (selectedOptions.length < maxSelections) {
      // Add option if under limit
      const newSelected = [...selectedOptions, option];
      setSelectedOptions(newSelected);
      onSelectionChange?.(newSelected);
    }
  };

  // Remove selected option
  const handleRemoveOption = (optionId: string) => {
    const newSelected = selectedOptions.filter(
      (selected) => selected.id !== optionId
    );
    setSelectedOptions(newSelected);
    onSelectionChange?.(newSelected);
  };

  // Check if option is selected
  const isOptionSelected = (option: Option) => {
    return selectedOptions.some((selected) => selected.id === option.id);
  };

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      {/* Main input trigger */}
      <div
        className={cn(
          "flex min-h-10 w-full rounded-md border border-input bg-primary px-3 py-2 text-sm ring-offset-background cursor-pointer",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          isOpen && "ring-2 ring-ring ring-offset-2"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <Badge
                key={option.id}
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1"
              >
                {option.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(option.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown content */}
      {/* {isOpen && ( */}
        <div className="absolute top-full z-50 w-full mt-4 rounded-md border bg-primary text-popover-foreground shadow-md">
          {/* Search input */}
          <div className="flex items-center border-b px-3 py-2">
            <Search className="h-4 w-4 opacity-50 mr-2" />
            <Input
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = isOptionSelected(option);
                const isDisabled =
                  !isSelected && selectedOptions.length >= maxSelections;

                return (
                  <div
                    key={option.id}
                    className={cn(
                      "flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer",
                      "hover:bg-accent hover:text-accent-foreground",
                      isDisabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => !isDisabled && handleOptionToggle(option)}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected && "bg-primary text-primary-foreground"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="flex-1">{option.label}</span>
                  </div>
                );
              })
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No options found
              </div>
            )}
          </div>

          {/* Selection counter */}
          <div className="border-t px-3 py-2 text-xs text-muted-foreground">
            {selectedOptions.length} of {maxSelections} selected
          </div>
        </div>
      {/* )} */}
    </div>
  );
}
