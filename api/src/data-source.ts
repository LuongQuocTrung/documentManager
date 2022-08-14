import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  Company,
  Department,
  Staff,
  Inventory,
  Cabinet,
  Drawer,
  Document,
} from "./entitys";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "document2",
  synchronize: true,
  logging: false,
  entities: [Company, Department, Staff, Inventory, Cabinet, Drawer, Document],
  migrations: [],
  subscribers: [],
});
