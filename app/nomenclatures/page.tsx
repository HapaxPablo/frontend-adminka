"use client";

import { useEffect, useState } from "react";
import { Button, Select, Skeleton, Typography, Input } from "antd/lib";
import Link from "next/link";
import { Chip } from "@nextui-org/react";

import styles from "./Nomenclature.module.scss";

import { NomenclaturesService } from "@/services/nomenclatures/nomenclatures.service";
import { NomenclatureListResponseInterface } from "@/types/interface/nomenclature.interface";

const { Search } = Input;

export default function Nomenclatures() {
  const [nomenclatures, setNomenclatures] =
    useState<NomenclatureListResponseInterface>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [version, setVersion] = useState<string>("");
  const [status, setStatus] = useState<string>(" ");
  const results = nomenclatures?.results;

  useEffect(() => {
    fetchNomenclatures(currentPage, limit, search, id, version, status);
  }, [currentPage, limit, search, id, version, status]);

  const fetchNomenclatures = async (
    page: number,
    limit: number,
    search: string,
    id: string,
    version: string,
    status: string,
  ) => {
    setIsLoading(true);
    try {
      const data = await NomenclaturesService.getAll({
        page,
        limit,
        search,
        id,
        version,
        status,
      });

      console.log("search:", search);

      setNomenclatures(data);
      setError("");
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch data");
    }
    setIsLoading(false);
  };

  const nextPage = () => {
    if (nomenclatures?.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (nomenclatures?.previous) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleIdChange = (value: string) => {
    setId(value);
  };
  const handleVersionChange = (value: string) => {
    setVersion(value);
  };
  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const getBorderColor = (status: number) => {
    switch (status) {
      case null:
        return "gray";
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "red";
      default:
        return "defaultColor"; // замените на любой цвет по вашему выбору
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading ? (
        <Skeleton active={isLoading} />
      ) : (
        <div className={styles.container}>
          <div className={styles.container_left}>
            <div className={styles.container_left_limit}>
              <Typography.Text type="secondary">Лимит:</Typography.Text>
              <Select
                style={{ width: 160 }}
                value={limit}
                onChange={handleLimitChange}
              >
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={25}>25</Select.Option>
                <Select.Option value={50}>50</Select.Option>
                <Select.Option value={100}>100</Select.Option>
              </Select>
            </div>
            <div className={styles.container_left_search}>
              {/* <Typography.Text type="secondary">Поиск:</Typography.Text> */}
              <Chip color="secondary">Поиск</Chip>
              <Search
                allowClear
                enterButton
                defaultValue={search}
                style={{ width: 160 }}
                value={search === "" ? undefined : search}
                onSearch={handleSearchChange}
              />
            </div>
            <div className={styles.container_left_search}>
              <Typography.Text type="secondary">Поиск по id:</Typography.Text>
              <Search
                allowClear
                enterButton
                defaultValue={id}
                style={{ width: 120 }}
                value={id === "" ? undefined : id}
                onSearch={handleIdChange}
              />
            </div>
            <div className={styles.container_left_search}>
              <Typography.Text type="secondary">Версия:</Typography.Text>
              <Search
                allowClear
                enterButton
                defaultValue={version}
                style={{ width: 150 }}
                value={version === "" ? undefined : version}
                onSearch={handleVersionChange}
              />
            </div>
            <div className={styles.container_left_search}>
              <Typography.Text type="secondary">Статус:</Typography.Text>
              <Select
                style={{ width: 160, color: "rgb(105 112 103 / 40%)" }}
                value={status}
                onChange={handleStatusChange}
              >
                <Select.Option value={""}>Все</Select.Option>
                <Select.Option value={"0"}>В сети</Select.Option>
                <Select.Option value={"1"}>Не в сети 5+ мин</Select.Option>
                <Select.Option value={"2"}>Не в сети 1+ ч</Select.Option>
                <Select.Option value={"null"}>Не выходили в сеть</Select.Option>
              </Select>
            </div>
            <div className={styles.container_left_search}>
              <Button style={{ width: 240 }} type="primary">
                <Link
                  href={`/nomenclatures/create`}
                  // rel="noopener noreferrer"
                  target="_blank"
                >
                  Создать
                </Link>
              </Button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/*<div className={styles.container_menu_table}>*/}
            {/*  <div className={styles.container_menu_table_row}>*/}
            {/*    <div className={styles.container_menu_table_item}>*/}
            {/*      Наименование*/}
            {/*    </div>*/}
            {/*    <div className={styles.container_menu_table_item}>*/}
            {/*      Часовой пояс*/}
            {/*    </div>*/}
            {/*    <div className={styles.container_menu_table_item}>*/}
            {/*      Последнее время ответа*/}
            {/*    </div>*/}
            {/*    <div className={styles.container_menu_table_item}>Версия</div>*/}
            {/*  </div>*/}
            {/*  {results?.map((el) => (*/}
            {/*    <div*/}
            {/*      key={el.id}*/}
            {/*      className={styles.container_menu_table_row_color}*/}
            {/*      style={{ borderColor: getBorderColor(el.status) }}*/}
            {/*    >*/}
            {/*      <div className={styles.container_menu_table_item}>*/}
            {/*        <Link*/}
            {/*          href={`/nomenclatures/${el.id}`}*/}
            {/*          // rel="noopener noreferrer"*/}
            {/*          target="_blank"*/}
            {/*        >*/}
            {/*          {el.name}*/}
            {/*        </Link>*/}
            {/*      </div>*/}
            {/*      <div className={styles.container_menu_table_item}>*/}
            {/*        {el.timezone}*/}
            {/*      </div>*/}
            {/*      <div className={styles.container_menu_table_item}>*/}
            {/*        {el.last_answer}*/}
            {/*      </div>*/}
            {/*      <div className={styles.container_menu_table_item}>*/}
            {/*        {el.version}*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  ))}*/}
            <div className={styles.container_menu_table_buttons}>
              <Button disabled={!nomenclatures?.previous} onClick={prevPage}>
                Prev
              </Button>
              <Button disabled={!nomenclatures?.next} onClick={nextPage}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
