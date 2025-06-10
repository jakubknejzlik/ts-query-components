import { ISequelizable, ISerializable } from "@jakub.knejzlik/ts-query";
import { StaticDatabase } from "./database-metadata";
import { DataSource } from "./DataSource";
import {
  createStaticDatabase,
  executeQueries,
  StaticDataTables,
} from "./static";

export class StaticDataSource implements DataSource {
  private db: Promise<StaticDatabase>;

  constructor(tables: StaticDataTables) {
    // Initialize with static data if needed
    this.db = createStaticDatabase(tables);
  }
  async executeQueries(
    queries: Array<ISequelizable & ISerializable>
  ): Promise<any> {
    const db = await this.db;
    const { data } = executeQueries(db.database, queries);
    return data.results;
  }
  async execute(query: ISequelizable & ISerializable): Promise<any> {
    const data = await this.executeQueries([query]);
    return data[0];
  }
}
