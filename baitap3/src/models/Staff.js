import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Staff",
  tableName: "Staff",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "text",
    },
    phone: {
      type: "varchar",
    },
    password: {
      type: "varchar",
      select: false,
    },
    isRoot: {
      type: "bool",
    },
    active: {
      type: "bool",
    },
  },
  relations: {
    department: {
      target: "Department",
      type: "many-to-one",
      joinColumn: true,
    },
    documents: {
      target: "Document",
      type: "one-to-many",
      inverseSide: "Staff",
      onDelete: "SET NULL",
    },
  },
});
