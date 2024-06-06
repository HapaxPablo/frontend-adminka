"use client";
import { Input } from "@nextui-org/react";
import React from "react";

const Search = ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  label,
  placeholder,
}) => {
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input
        label={label}
        placeholder={placeholder}
        type="text"
        value={searchValue}
        onChange={onSearchChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
