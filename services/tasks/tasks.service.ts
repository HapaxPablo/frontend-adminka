import { API_URL } from "@/config/api.config";
import {
  TaskListResponse,
  TasksListResponseDTO,
} from "@/types/interface/tasks.interface";
import { taskResponseTransformer } from "@/types/transformers/tasks.transforems";

export const TasksService = {
  async getAll(): Promise<TaskListResponse> {
    const response = await fetch(`${API_URL}/api/tasks/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data: TasksListResponseDTO = await response.json(); // Используем TasksListResponseDTO для данных из API

      console.log(data);

      return taskResponseTransformer(data); // Преобразуем данные в TaskListResponse
    } else {
      throw new Error("Не удалось получить список задач");
    }
  },
};