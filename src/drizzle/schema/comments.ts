import { sql } from "drizzle-orm";
import { sqliteTable as table, integer, text, primaryKey, foreignKey } from "drizzle-orm/sqlite-core";

import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

import { posts } from "./posts";

export const comments = table(
    "comments",
    {
        id: integer().primaryKey({ autoIncrement: true }),
        content: text().notNull(),
        postId: text().notNull(),
        createdAt: integer({ mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    }, (table) => {
        return {
            postReference: foreignKey({
                columns: [table.postId],
                foreignColumns: [posts.id],
                name: "postId_fkey",
            }),
        }
    }
);

export type Comment = InferSelectModel<typeof comments>
export type InsertComment = InferInsertModel<typeof comments>