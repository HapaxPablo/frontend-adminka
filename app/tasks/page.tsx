"use client";

import { useEffect, useState } from "react";
import {
  Chip,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";

import { TaskListResponse } from "@/types/interface/tasks.interface";
import { toastError } from "@/utils/toast-error";
import { TasksService } from "@/services/tasks/tasks.service";

export default function Tasks() {
  const [data, setData] = useState<TaskListResponse | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const pages = Math.ceil((data?.count || 0) / limit);

  const fetchTasks = async () => {
    try {
      const response = await TasksService.getAll();

      if (response) {
        setData(response);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center">
        <Spinner aria-label="Spinner example" />
      </div>
    );
  }

  return (
    <>
      <Table
        isHeaderSticky
        bottomContent={
          <div className="flex justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        }
      >
        <TableHeader>
          {/* <TableColumn>создатель</TableColumn> */}
          <TableColumn>клиент</TableColumn>
          <TableColumn>тип</TableColumn>
          <TableColumn>создана</TableColumn>
          <TableColumn>обновлена</TableColumn>
          <TableColumn>статус</TableColumn>
        </TableHeader>
        <TableBody>
          {data.results.map((task) => (
            <TableRow key={task.id}>
              {/* <TableCell>
                <Link href={`/tasks/${task.id}`}>
                  <Chip color="default">{task.owner.fullName}</Chip>
                </Link>
              </TableCell> */}
              <TableCell>{task.client}</TableCell>
              <TableCell>{task.type.toString()}</TableCell>
              <TableCell>
                {new Date(task.created).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(task.updated).toLocaleDateString()}
              </TableCell>
              <TableCell>{task.status.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
