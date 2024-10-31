import { sql } from "drizzle-orm";
import { sqliteTable as table, integer, text, primaryKey, foreignKey } from "drizzle-orm/sqlite-core";

import users from "./users";

const posts = table(
    "posts",
    {
        id: integer().primaryKey({ autoIncrement: true }),
        title: text().notNull(),
        content: text().notNull(),
        ownerId: text().notNull(),
        createdAt: integer({ mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    }, (table) => {
        return {
            userReference: foreignKey({
                columns: [table.ownerId],
                foreignColumns: [users.uid],
                name: "ownerId_fkey",
            }),
        }
    }
);

export default posts;