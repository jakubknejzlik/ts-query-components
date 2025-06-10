import { ColumnType as AntdColumnType } from "antd/es/table";
import dayjs from "dayjs";
import numeral from "numeral";

export type DefaultColumnType = {
  type?: never;
};
export type StringColumnType = {
  type: "string";
};
export type NumberColumnType = {
  type: "number";
  decimals?: number;
};
export type DateTimeColumnType = {
  type: "dateTime";
};

export type ColumnType<RecordType> = (
  | DefaultColumnType
  | StringColumnType
  | NumberColumnType
  | DateTimeColumnType
) &
  AntdColumnType<RecordType>;
export type ColumnsType<RecordType> = ColumnType<RecordType>[];

export const getDefaultPropsForColumnType = <RecordType,>(
  t: ColumnType<RecordType>
): AntdColumnType<RecordType> => {
  switch (t.type) {
    case "number":
      return {
        align: "right",
        sorter: true,
        render: (value: number) =>
          numeral(value).format(
            `0,0` + (t.decimals ? `.${"0".repeat(t.decimals)}` : "")
          ),
      };
    case "dateTime":
      return {
        align: "center",
        sorter: true,
        render: (value: Date | string) =>
          dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
      };
    default:
      return { sorter: true };
  }
};
