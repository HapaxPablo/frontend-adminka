import { API_URL } from "@/config/api.config";
import {
  FilesCreateRequest,
  FilesCreateRequestDTO,
  FilesCreateResponse,
  FilesCreateResponseDTO,
  FilesListResponse,
  FilesListResponseDTO,
  TagsCreateRequest,
  TagsCreateResponse,
} from "@/types/interface/files.interface";
import {
  filesCreateRequestTransformer,
  filesCreateResponseTransformer,
  filesListResponseTransformer,
} from "@/types/transformers/files.transformer";

interface Pagination {
  page?: number;
  limit?: number;
  name?: string;
  file_type?: string;
}

export const FilesService = {
  async getAll({
    page,
    limit,
    name,
    file_type,
  }: Pagination = {}): Promise<FilesListResponse> {
    let url = `${API_URL}/api/files/`;

    if (page !== undefined) {
      url += `?page=${page}`;
    }
    if (limit !== undefined) {
      url += `&limit=${limit}`;
    }
    if (name !== undefined) {
      url += `&name=${name}`;
    }
    if (file_type !== undefined) {
      url += `&file_type=${file_type}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data: FilesListResponseDTO = await response.json();

      console.log("response:", data);
      console.log("transf data:", filesListResponseTransformer(data));

      return filesListResponseTransformer(data);
    } else {
      throw new Error("Не удалось получить список файлов");
    }
  },
  async createFiles(
    fileData: FilesCreateRequest,
    token: string,
  ): Promise<FilesCreateResponse> {
    const url = `${API_URL}/api/files/`;
    const body: FilesCreateRequestDTO = filesCreateRequestTransformer(fileData);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `access_token ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data: FilesCreateResponseDTO = await response.json();

      return filesCreateResponseTransformer(data);
    } else {
      throw new Error("Не удалось создать файл");
    }
  },

  async createTags(
    tagsData: TagsCreateRequest,
    token: string,
  ): Promise<TagsCreateResponse> {
    const url = `${API_URL}/api/tags/`;
    const body = JSON.stringify(tagsData);

    console.log(body);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `access_token ${token}`,
      },
      body: body,
    });

    if (response.ok) {
      const data: TagsCreateResponse = await response.json();

      return data;
    } else {
      throw new Error(
        `${(response.status, response.statusText)}`,
      );
    }
  },
};
// async createFiles(fileData: FilesCreateRequest): Promise<FilesCreateResponse> {
//   const url = `${API_URL}/api/files/`;

//   const formData = new FormData();
//   formData.append("name", fileData.name);
//   formData.append("fileType", fileData.fileType.toString());
//   formData.append("tags", JSON.stringify(fileData.tags));
//   formData.append("file", fileData.file);

//   const response = await fetch(url, {
//     method: "POST",
//     body: formData,
//   });

//   if (response.ok) {
//     const data: FilesCreateResponseDTO = await response.json();
//     return filesCreateResponseTransformer(data);
//   } else {
//     throw new Error("Не удалось создать файл");
//   }
// }
