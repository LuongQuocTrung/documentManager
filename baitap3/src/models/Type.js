import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Type",
  tableName: "Type",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    name: {
      type: "text",
    },
  },
});
