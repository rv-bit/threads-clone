import { sql } from "drizzle-orm";
import { sqliteTable as table, integer, text, primaryKey, foreignKey } from "drizzle-orm/sqlite-core";

import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const posts = table(
    "posts",
    {
        id: integer().primaryKey({ autoIncrement: true }),
        title: text().notNull(),
        content: text().notNull(),
        images: text().default(sql`'[]'`),
        createdAt: integer({ mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    }
);

export type Post = InferSelectModel<typeof posts>
export type InsertPost = InferInsertModel<typeof posts>