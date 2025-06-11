import type { Meta, StoryObj } from "@storybook/react-vite";

import { Q } from "@jakub.knejzlik/ts-query";
import { Table } from "../src/data-display/Table";

import { mockDataSource } from "./fixtures";

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;
export default meta;

type Story = StoryObj<typeof meta>;

export const StaticData = {
  args: {
    query: Q.select().from("users"),
    dataSource: mockDataSource,
    columns: [
      { dataIndex: "id", title: "ID" },
      { dataIndex: "name", title: "Name" },
      { dataIndex: "birthdate", title: "Birthdate", type: "dateTime" },
      {
        dataIndex: "salary",
        title: "Salary",
        type: "number",
      },
      {
        key: "salaryWithDecimals",
        dataIndex: "salary",
        title: "Salary With Decimals",
        type: "number",
        decimals: 2,
      },
    ],
  },
} satisfies Story;

// makeLiveEditStory(StaticData, {
//   availableImports: { "my-library": { Table, Q, StaticDataSource } },
//   code: `
// import { Table, Q ,StaticDataSource} from "my-library";
// const query = Q.select().from("users");
// const dataSource = new StaticDataSource({
//   users: [
//     { id: "1", name: "John Doe", birthdate: "1990-01-15", salary: 60000 },
//     { id: "2", name: "Jane Smith", birthdate: "1985-03-22", salary: 75000 },
//     {
//       id: "3",
//       name: "Alice Johnson",
//       birthdate: "1992-07-08",
//       salary: 68000,
//     },
//     { id: "4", name: "Bob Brown", birthdate: "1988-11-30", salary: 72000 },
//     {
//       id: "5",
//       name: "Charlie White",
//       birthdate: "1995-05-12",
//       salary: 54000,
//     },
//     {
//       id: "6",
//       name: "Diana Green",
//       birthdate: "1991-09-17",
//       salary: 63000,
//     },
//     { id: "7", name: "Ethan Blue", birthdate: "1987-02-25", salary: 80000 },
//     {
//       id: "8",
//       name: "Fiona Black",
//       birthdate: "1993-06-03",
//       salary: 67000,
//     },
//     {
//       id: "9",
//       name: "George Yellow",
//       birthdate: "1989-12-19",
//       salary: 71000,
//     },
//     {
//       id: "10",
//       name: "Hannah Purple",
//       birthdate: "1994-04-27",
//       salary: 59000,
//     },
//   ],
// })
// export default ()=><Table
//   query={query}
//   dataSource={dataSource}
//   columns={[
//     { dataIndex: "id", title: "ID" },
//     { dataIndex: "name", title: "Name" },
//     { dataIndex: "birthdate", title: "Birthdate", type: "dateTime" },
//     {
//       dataIndex: "salary",
//       title: "Salary",
//       type: "number",
//     },
//     {
//       key: "salaryWithDecimals",
//       dataIndex: "salary",
//       title: "Salary With Decimals",
//       type: "number",
//       decimals: 2,
//     },
//   ]}
// />
// `,
// });
