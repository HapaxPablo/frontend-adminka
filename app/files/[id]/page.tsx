"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";

import { ReadFileResponse } from "@/types/interface/files.interface";
import { FilesService } from "@/services/files/files.service";
import { checkSize } from "@/types/types/checkSize";
import { convertType } from "@/types/types/fileTypes";
import { toastError } from "@/utils/toast-error";
import Loader from "@/components/ui/Loader";

export default function ReadFile() {
  const [data, setData] = useState<ReadFileResponse | undefined>(undefined);
  const router = useParams();
  const id = router.id;

  const fetchFileInfo = async () => {
    try {
      const info = await getFileInfo(id);

      if (info) {
        setData(info);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    fetchFileInfo();
  }, [id]);

  if (!data) {
    return <Loader />;
  }

  return (
    <div>
      <Card className="w-auto">
        <CardHeader className="flex gap-3 justify-center">
          <div className="flex flex-row items-center gap-1">
            <p className="text-md">Название</p>
            <p className="text-default-500">{data?.name}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex items-center">
          <div className="flex flex-row items-center gap-1">
            <p className="text-md">Тэги</p>
            <p className=" text-default-500">{data?.tags}</p>
          </div>
          {data?.length && (
            <div className="flex flex-row items-center gap-1">
              <p className="text-md">Длина</p>
              <p className=" text-default-500">{data?.length}</p>
            </div>
          )}
          <div className="flex flex-row items-center gap-1">
            <p className="text-md">Размер</p>
            <p className=" text-default-500">{checkSize(data?.size)}</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-md p-0 m-0">Тип</p>
            <p className=" text-default-500 p-0 m-0">
              {convertType(data?.fileType)}
            </p>
          </div>
          <Divider />
          <div className="flex flex-col items-center gap-1 flex-wrap ">
            <p className="text-md p-0 m-0">Hash</p>
            <div className="flex flex-row items-center gap-1">
              <p className="text-md p-0 m-0">sha256:</p>
              <p className=" text-default-500 p-0 m-0">{data?.hash.sha256}</p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <p className="text-md p-0 m-0">md5:</p>
              <p className=" text-default-500 p-0 m-0">{data?.hash.md5}</p>
            </div>
            <div className="flex flex-row items-center gap-1">
              <p className="text-md p-0 m-0">concatHash:</p>
              <p className=" text-default-500 p-0 m-0">
                {data?.hash.concatHash}
              </p>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-center flex-col gap-2">
          <p className="text-md">заглущка</p>
          <Image
            alt={`${data?.name}`}
            height={240}
            loading="lazy"
            radius="sm"
            src="https://bigpicture.ru/wp-content/uploads/2014/12/luchshie-foto-nedeli-v-dek-2014-0.jpg"
            width={240}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

async function getFileInfo(id: string | string[]) {
  const res = await FilesService.getById(id);

  return res;
}
