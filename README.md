# @jakub.knejzlik/ts-query-components

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Documentation-blue)](https://jakubknejzlik.github.io/ts-query-components/)

UI Components based on [@jakubknejzlik/ts-query](https://github.com/jakubknejzlik/ts-query)

## Installation

Install the package using npm:

```sh
npm add @jakub.knejzlik/ts-query @jakub.knejzlik/ts-query-components
```

## Usage

Create component using query:

```ts
import { Table, StaticDataSource } from "@jakub.knejzlik/ts-query-components";
import { Q } from "@jakub.knejzlik/ts-query";

const dataSoure = new StaticDataSource({
  users: [
    { id: "1", name: "John Doe", wage: 1234 },
    { id: "2", name: "Jane Doe", wage: 4321 },
  ],
});

export const MyTable = () => {
  return (
    <Table
      query={Q.select().from("users")}
      dataSource={dataSource}
      columns={[
        { name: "id" },
        { name: "name" },
        { type: "number", name: "wage" },
      ]}
    />
  );
};
```

## Documentation

For more detailed usage instructions and API documentation, visit the [Github pages](https://jakubknejzlik.github.io/ts-query-components/).

## Testing

Run the test suite using the `test` script:

```sh
npm run test
```

## Contributing

Contributions are welcome. Please submit a pull request or create an issue on the [Github repository](https://github.com/jakubknejzlik/ts-query-components).

## License

This project is licensed under the MIT License.
