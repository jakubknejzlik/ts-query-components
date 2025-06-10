import React, { useState } from "react";

import { Alert, Table as AntdTable } from "antd";
import { TableProps as AntdTableProps } from "antd";
import { Fn, Q, SelectQuery } from "@jakub.knejzlik/ts-query";
import { DataSource } from "../data-sources/DataSource";
import { useQuery } from "@tanstack/react-query";
import { SorterResult, TablePaginationConfig } from "antd/es/table/interface";
import {
  ColumnsType,
  ColumnType,
  getDefaultPropsForColumnType,
} from "./types/Columns";
import {
  PaginationConfig,
  PaginationPosition,
} from "antd/es/pagination/Pagination";

interface TableProps<RecordType>
  extends Omit<TableBaseProps<RecordType>, "state" | "setState"> {}

type TableState = {
  sorter?: SorterResult<any> | SorterResult<any>[];
  pagination?: TablePaginationConfig;
};

export const Table = <RecordType,>(props: TableProps<RecordType>) => {
  const [state, setState] = useState<TableState>();
  return <TableBase state={state} setState={setState} {...props} />;
};

interface TableBaseProps<RecordType>
  extends Omit<AntdTableProps<RecordType>, "columns" | "dataSource"> {
  state?: TableState;
  setState?: React.Dispatch<React.SetStateAction<TableState | undefined>>;
  query: SelectQuery;
  dataSource: DataSource;
  columns?: ColumnsType<RecordType>;
}

export const TableBase = <RecordType,>({
  query,
  dataSource,
  columns,
  state,
  setState,
  pagination,
  ...rest
}: TableBaseProps<RecordType>) => {
  let sourceQuery = query;

  if (state?.sorter) {
    const sorters = Array.isArray(state.sorter) ? state.sorter : [state.sorter];
    for (const sorter of sorters) {
      if (!sorter.column?.dataIndex) continue;
      sourceQuery = sourceQuery.orderBy(
        sorter.column.dataIndex,
        sorter.order === "ascend" ? "ASC" : "DESC"
      );
    }
  }

  const countQuery = Q.select()
    .addField(Fn.count("*"), "count")
    .from(sourceQuery);

  const _pagination = { pageSize: 30, ...(state?.pagination ?? pagination) };
  if (_pagination) {
    if (_pagination.current !== undefined) {
      sourceQuery = sourceQuery.offset(
        (_pagination.current - 1) * _pagination.pageSize
      );
    }
    if (_pagination.pageSize !== undefined) {
      sourceQuery = sourceQuery.limit(_pagination.pageSize);
    }
  }

  const { isLoading, data, error } = useQuery<
    [RecordType[], { count: number }]
  >({
    queryKey: ["query", sourceQuery.toSQL()],
    queryFn: async () => {
      const [rows, count] = await dataSource.executeQueries([
        sourceQuery,
        countQuery,
      ]);
      return [rows as RecordType[], { count: count[0].count }];
    },
  });
  const [dataRows, dataCount] = data ?? [];

  if (error) {
    return <Alert message="Error" description={error.message} type="error" />;
  }

  return (
    <>
      <AntdTable
        dataSource={dataRows}
        columns={columns?.map((c) => ({
          ...getDefaultPropsForColumnType(c),
          ...c,
        }))}
        loading={isLoading}
        pagination={{
          showTotal: (total, range) => `${range.join("-")} / ${total}`,
          total: dataCount?.count,
          ..._pagination,
        }}
        onChange={(pagination, filters, sorter, extra) => {
          console.log("Table changed:", pagination, filters, sorter, extra);
          setState?.((prev) => ({
            ...prev,
            sorter,
            pagination,
          }));
        }}
        {...rest}
      />
    </>
  );
};
