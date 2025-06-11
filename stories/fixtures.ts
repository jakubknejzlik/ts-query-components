import { StaticDataSource } from "../src/data-sources";

export const mockDataSource = new StaticDataSource({
  users: [
    { id: "1", name: "John Doe", birthdate: "1990-01-15", salary: 60000 },
    { id: "2", name: "Jane Smith", birthdate: "1985-03-22", salary: 75000 },
    {
      id: "3",
      name: "Alice Johnson",
      birthdate: "1992-07-08",
      salary: 68000,
    },
    { id: "4", name: "Bob Brown", birthdate: "1988-11-30", salary: 72000 },
    {
      id: "5",
      name: "Charlie White",
      birthdate: "1995-05-12",
      salary: 54000,
    },
    {
      id: "6",
      name: "Diana Green",
      birthdate: "1991-09-17",
      salary: 63000,
    },
    { id: "7", name: "Ethan Blue", birthdate: "1987-02-25", salary: 80000 },
    {
      id: "8",
      name: "Fiona Black",
      birthdate: "1993-06-03",
      salary: 67000,
    },
    {
      id: "9",
      name: "George Yellow",
      birthdate: "1989-12-19",
      salary: 71000,
    },
    {
      id: "10",
      name: "Hannah Purple",
      birthdate: "1994-04-27",
      salary: 59000,
    },
  ],
});
