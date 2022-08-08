import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Document",
  tableName: "Document",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "text",
    },
    createdAt: {
      type: "timestamp",
    },
    updatedAt: {
      type: "timestamp",
    },
  },
  relations: {
    staff: {
      target: "Staff",
      type: "many-to-one",
      joinColumn: true,
    },
    drawer: {
      target: "Drawer",
      type: "many-to-one",
      joinColumn: true,
    },
    status: {
      target: "Status",
      type: "one-to-one",
      joinColumn: true,
    },
  },
});
