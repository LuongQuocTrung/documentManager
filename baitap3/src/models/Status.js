import { randomUUID } from "crypto";
import { EntitySchema } from "typeorm";

const Status = new EntitySchema({
  name: "Status",
  tableName: "Status",
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
});

export default Status;
