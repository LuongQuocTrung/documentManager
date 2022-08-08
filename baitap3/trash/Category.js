import { EntitySchema } from "typeorm";

const Category = new EntitySchema({
  name: "Category",
  tableName: "Categories",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
  },
});

export default Category;
