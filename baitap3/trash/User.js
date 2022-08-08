import { EntitySchema } from "typeorm";


const User = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        birthDate: {
            type: 'timestamp',
        }
    },
    relations: {
        posts: {
            target: 'Post',
            type: 'one-to-many',
            joinTable: true,
            cascade: true,
        }
    }
})

export default User