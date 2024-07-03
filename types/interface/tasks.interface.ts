export type TasksListResponseDTO = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TaskDTO[];
};

export type TaskDTO = {
  id: string;
  owner: OwnerTaskDTO;
  client: string;
  type: number;
  created: string;
  updated: string;
  status: number;
};

export type TaskListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Task[];
};

export type Task = {
  id: string;
  owner: OwnerTask;
  client: string;
  type: number;
  created: string;
  updated: string;
  status: number;
};

export type OwnerTaskDTO = {
    full_name: string;
}

export type OwnerTask = {
    fullName: string;
}
