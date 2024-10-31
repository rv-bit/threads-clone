import { sql } from "drizzle-orm";
import { sqliteTable as table, integer, text, primaryKey, foreignKey } from "drizzle-orm/sqlite-core";

import users from "./users";
import posts from "./posts";

export const comments = table(
    "comments",
    {
        id: integer().primaryKey({ autoIncrement: true }),
        content: text().notNull(),
        ownerId: text().notNull(),
        postId: text().notNull(),
        createdAt: integer({ mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    }, (table) => {
        return {
            userReference: foreignKey({
                columns: [table.ownerId],
                foreignColumns: [users.uid],
                name: "ownerId_fkey",
            }),
            postReference: foreignKey({
                columns: [table.postId],
                foreignColumns: [posts.id],
                name: "postId_fkey",
            }),
        }
    }
);