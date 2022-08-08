import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Inventory",
  tableName: "Inventory",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "text",
    },
  },
  relations: {
    company: {
      target: "Company",
      type: "many-to-one",
      joinColumn: true,
    },
    cabinets: {
      target: "Cabinet",
      type: "one-to-many",
      onDelete: "SET NULL",
      inverseSide: "Inventory",
    },
  },
});
