import { EntitySchema } from "typeorm";

const Post = new EntitySchema({
  name: "Post",
  tableName: "post",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    text: {
      type: "text",
    },
    createdAt: {
      type: 'timestamp',
    },
    updatedAt: {
      type: 'timestamp',
    }
  },
  relations: {
    categories: {
      target: "Category",
      type: "many-to-many",
      joinTable: true,
      cascade: true,
    },
    author: {
      target: 'User',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
    }
  },
});

export default Post;
