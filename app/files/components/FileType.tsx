"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

import { fileTypes } from "@/types/types/fileTypes";

const FileType = ({ setFileType, type }) => {
  console.log(fileTypes);

  const handleChange = (value) => {
    if (value === "all") {
      setFileType(""); // Сбросить фильтр
    } else {
      const parsedValue = Number(value);

      if (!isNaN(parsedValue)) {
        setFileType(parsedValue);
      } else {
        console.error("Invalid value selected:", value);
      }
    }
  };

  return (
    <Select
      label="Выберите тип файла"
      onChange={(e) => handleChange(e.target.value)}
      defaultSelectedKeys={[`${type}`]}
    >
      {fileTypes.map((option) => (
        <SelectItem key={option.key} value={option.key}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FileType;
