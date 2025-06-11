import type { Meta, StoryObj } from "@storybook/react-vite";

import { Q } from "@jakub.knejzlik/ts-query";
import { Select } from "../";
import { mockDataSource } from "./fixtures";

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const StaticData = {
  args: {
    query: Q.select()
      .addField("name", "label")
      .addField("id", "value")
      .from("users"),
    dataSource: mockDataSource,
    styles: { root: { width: "300px" } },
    placeholder: "Select a user",
  },
} satisfies Story;
