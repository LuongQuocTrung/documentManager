import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Company",
  tableName: "Company",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "text",
      unique: true,
    },
    address: {
      type: "text",
    },
  },
  relations: {
    type: {
      target: "Type",
      type: "many-to-one",
      joinColumn: true,
    },
    departments: {
      target: "Department",
      type: "one-to-many",
      onDelete: "SET NULL",
      inverseSide: "Company",
    },
    inventories: {
      target: "Inventory",
      type: "one-to-many",
      onDelete: "SET NULL",
      inverseSide: "Company",
    },
  },
});
