import "reflect-metadata";
import { DataSource } from "typeorm";
import { Email } from "./entity/Email";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5438,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Email],
  migrations: [],
  subscribers: [],
});
