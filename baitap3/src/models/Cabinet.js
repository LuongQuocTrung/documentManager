import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Cabinet",
  tableName: "Cabinet",
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
    inventory: {
      target: "Inventory",
      type: "many-to-one",
      joinColumn: true,
    },
    drawers: {
      target: "Drawer",
      type: "one-to-many",
      onDelete: "SET NULL",
      inverseSide: "Cabinet",
    },
  },
});
