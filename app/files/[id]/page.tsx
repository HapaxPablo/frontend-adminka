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
  Spinner,
} from "@nextui-org/react";

import { getTokenStorage } from "@/services/auth/auth.helper";
import { FilesService } from "@/services/files/files.service";
import { ReadFileResponse } from "@/types/interface/files.interface";
import { checkSize } from "@/types/types/checkSize";
import { convertType } from "@/types/types/fileTypes";
import { Button } from "@/stories/Button";

export default function ReadFile() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ReadFileResponse | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const router = useParams();
  const token = getTokenStorage();
  const id = router.id;

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const res = await FilesService.getById(id, token);

      setData(res);
      setError("");
    } catch (error: any) {
      setError("Failed to fetch data");
    }
    setIsLoading(false);
  };

  // if (!data) {
  //   return <div>{error}</div>;
  // }

  return (
    <>
      {isLoading ? (
        <Spinner label="Загрузка..." />
      ) : (
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
                <p className=" text-default-500 p-0 m-0">
                  sha256: {data?.hash.sha256}
                </p>
                <p className=" text-default-500 p-0 m-0">
                  md5: {data?.hash.md5}
                </p>
                <p className=" flex text-default-500 p-0 m-0 flex-wrap">
                  concatHash: {data?.hash.concatHash}
                </p>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center">
              <Image
                alt={`${data?.name}`}
                height={240}
                loading="lazy"
                radius="sm"
                src="http://192.168.0.180:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2xvY2FsLW1lZGlhL2Rvd25sb2FkZWRfZmlsZXMvc291cmNlL3Rlc3Rlc3Rlc3Rlc3QucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9REpHNjZRM1pJODBOTUs4NDdHOFElMkYyMDI0MDYyNyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDA2MjdUMTAwMjA0WiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKRVNrYzJObEV6V2trNE1FNU5TemcwTjBjNFVTSXNJbVY0Y0NJNk1UY3hPVFV5TlRjd015d2ljR0Z5Wlc1MElqb2lVazlQVkZWVFJWSWlmUS5hc19HaVZRZko3UWxDcWlhUVVEZDluUnIwemJlYnljLV9VQllqa0g3MS1KSmJiSlNySTIzSFRFZUR1dWc5WVJiZlhPT2piWDVPdHU4d0VPRjBLdzl4dyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTBlYTBjMzhhNzM1MDM2NmZkNDAwYjBjMzJhNjhkOWJmNmQxNzQxNzFhNDNhZWYyMzMwYWNmMTBjYjliMjYzMDY"
                width={240}
              />
            </CardFooter>
          </Card>
          <Button label="Edit" />
        </div>
      )}
    </>
  );
}
