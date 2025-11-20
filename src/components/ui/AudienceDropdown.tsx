import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export interface AudienceOption {
  key: string;
  label: string;
  description?: string;
}

interface AudienceDropdownProps {
  options: AudienceOption[];
  onSelectionChange: (selectedKey: string) => void;
  selectedKey?: string;
  placeholder?: string;
  className?: string;
  id?: string;
}

export const AudienceDropdown: React.FC<AudienceDropdownProps> = ({
  options,
  onSelectionChange,
  selectedKey,
  placeholder = "Select an audience",
  className = "",
  id,
}) => {
  const [selected, setSelected] = useState<string>(selectedKey || "");

  const handleSelectionChange = (keys: any) => {
    const newSelection = Array.from(keys).join("");
    setSelected(newSelection);
    onSelectionChange(newSelection);
  };

  const getSelectedLabel = () => {
    if (!selected) return placeholder;
    const option = options.find(opt => opt.key === selected);
    return option ? option.label : placeholder;
  };

  return (
    <div className={`audience-dropdown ${className}`} id={id}>
      <Dropdown>
        <DropdownTrigger>
          <Button 
            variant="bordered" 
            className="w-full justify-between text-left font-medium"
            endContent={
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            }
          >
            <span>{getSelectedLabel()}</span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Audience selection"
          selectionMode="single"
          selectedKeys={selected ? new Set([selected]) : new Set([])}
          onSelectionChange={handleSelectionChange}
          classNames={{
            base: "w-full min-w-[240px]",
          }}
        >
          {options.map((option) => (
            <DropdownItem
              key={option.key}
              description={option.description}
              classNames={{
                base: "py-3 px-4",
                description: "text-sm text-gray-600",
              }}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default AudienceDropdown;