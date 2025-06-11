import React, { useState } from "react";

import { Cond, Fn, Q, SelectQuery } from "@jakub.knejzlik/ts-query";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Select as AntdSelect,
  SelectProps as AntdSelectProps,
} from "antd";
import { DataSource } from "../data-sources/DataSource";
import { DefaultOptionType } from "antd/es/select";
import { useDebounce } from "@uidotdev/usehooks";

interface TableProps<RecordType extends DefaultOptionType>
  extends Omit<SelectBaseProps<RecordType>, "state" | "setState"> {}

type SelectState = {
  search?: string;
};

export const Select = <RecordType extends DefaultOptionType>(
  props: TableProps<RecordType>
) => {
  const [state, setState] = useState<SelectState>();
  return <SelectBase state={state} setState={setState} {...props} />;
};

interface SelectBaseProps<RecordType extends DefaultOptionType>
  extends AntdSelectProps<RecordType> {
  state?: SelectState;
  setState?: React.Dispatch<React.SetStateAction<SelectState | undefined>>;
  query: SelectQuery;
  dataSource: DataSource;
}

export const SelectBase = <RecordType extends DefaultOptionType>({
  state,
  setState,
  query,
  dataSource,
  ...rest
}: SelectBaseProps<RecordType>) => {
  let sourceQuery = query.groupBy("value");
  const debouncedSearch = useDebounce(state?.search, 300);

  if (debouncedSearch) {
    sourceQuery = Q.select()
      .from(sourceQuery)
      .where(
        Cond.or([
          Cond.like("label", `%${debouncedSearch}%`),
          Cond.like("value", `%${debouncedSearch}%`),
        ])
      );
  }

  const countQuery = Q.select()
    .addField(Fn.count("*"), "count")
    .from(sourceQuery);

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
      <AntdSelect
        showSearch
        loading={isLoading || state?.search !== debouncedSearch}
        searchValue={state?.search}
        onSearch={(search) => setState?.((prev) => ({ ...prev, search }))}
        filterOption={false}
        options={dataRows ?? []}
        {...rest}
      />
    </>
  );
};
