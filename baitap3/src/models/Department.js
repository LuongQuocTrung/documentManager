import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Department",
  tableName: "Department",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "text",
    },
    active: {
      type: "bool",
    },
  },
  relations: {
    company: {
      target: "Company",
      type: "many-to-one",
      joinColumn: true,
    },
    staffs: {
      target: "Staff",
      type: "one-to-many",
      onDelete: "SET NULL",
      inverseSide: "Department",
    },
  },
});
