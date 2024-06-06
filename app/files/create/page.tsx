"use client";

import React, { useState } from "react"; // путь до вашего файла с FilesService

import {
  FilesCreateRequest,
  TagsCreateRequest,
} from "@/types/interface/files.interface"; // путь до вашего файла с интерфейсами
import { FilesService } from "@/services/files/files.service";
import { getTokenStorage } from "@/services/auth/auth.helper";
import CustomModal from "@/components/infoResponseModal";
import Error from "next/error";

export default function FilesCreate() {
  const [name, setName] = useState("");
  const [fileType, setFileType] = useState(1); // замените на соответствующий тип файла
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null); // новое состояние для файла
  const [error, setError] = useState<string | null>(null);
  const [nameTags, setNameTags] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [responseContent, setResponseContent] = useState("");

  const token = getTokenStorage();

  const handleCreateFile = async () => {
    if (!file) {
      setError("Пожалуйста, выберите файл");

      return;
    }

    const fileData: FilesCreateRequest = {
      name,
      fileType,
      tags,
      file,
    };

    try {
      const response = await FilesService.createFiles(fileData, token);

      console.log("File created successfully:", response);
      // Очистка полей формы после успешного создания файла
      setName("");
      setFileType(1);
      setTags([]);
      setFile(null);
      setError(null);
    } catch (error) {
      console.error("Error creating file:", error);
      setError("Не удалось создать файл");
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateTags = async () => {
    const tagsData: TagsCreateRequest = {
      name: nameTags,
    };

    console.log(tagsData);

    try {
      const response = await FilesService.createTags(tagsData, token);

      setResponseContent(JSON.stringify(response, null, 2)); // Форматирование JSON для отображения
      openModal();
      console.log("Tags created successfully:", response);
      setNameTags("");
      setError(null);
    } catch (error) {
      setResponseContent(`${error.message}`);
      openModal();
      console.error("Error creating tags:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Create File</h1>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateFile();
        }}
      >
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            File Type:
            <input
              type="number"
              value={fileType}
              onChange={(e) => setFileType(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Tags:
            <input
              type="text"
              value={tags.join(", ")}
              onChange={(e) =>
                setTags(e.target.value.split(",").map((tag) => tag.trim()))
              }
            />
          </label>
        </div>
        <div>
          <label>
            File:
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
        <button type="submit">Create File</button>
      </form> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateTags();
        }}
      >
        <h2>Tags</h2>
        <label>
          Tags:
          <input
            type="text"
            value={nameTags}
            onChange={(e) => setNameTags(e.target.value)}
          />
        </label>
        <button type="submit">Create tag</button>
      </form>
      {/* {modalIsOpen && ( */}
      <CustomModal
        content={responseContent}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
      {/* )} */}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
