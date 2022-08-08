import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Drawer",
  tableName: "Drawer",
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
    cabinet: {
      target: "Cabinet",
      type: "many-to-one",
      joinColumn: true,
    },
    staffs: {
      target: "Document",
      type: "one-to-many",
      inverseSide: "Drawer",
    },
  },
});
