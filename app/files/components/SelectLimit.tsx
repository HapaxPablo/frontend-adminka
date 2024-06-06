"use client";

import { Select, SelectItem } from "@nextui-org/select";
import React from "react";

import { limitPages } from "@/types/types/limitPages";

const SelectLimit = ({ label, placeholder, limitValue, setLimitValue }) => {
  const handleChange = (value) => {
    // Ensure the value is parsed to a number before setting it
    const parsedValue = Number(value);

    if (!isNaN(parsedValue)) {
      setLimitValue(parsedValue);
    } else {
      console.error("Invalid value selected:", value);
    }
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      value={limitValue.toString()} // Ensure default value is a string
      onChange={(e) => handleChange(e.target.value)}
      defaultSelectedKeys={[`${limitValue}`]}
    >
      {limitPages.map((option) => (
        <SelectItem key={option.key} value={option.key}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectLimit;
