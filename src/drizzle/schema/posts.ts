import { sql } from "drizzle-orm";
import { sqliteTable as table, integer, text } from "drizzle-orm/sqlite-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const posts = table("posts", {
	id: integer().primaryKey({ autoIncrement: true }),
	content: text().notNull(),
	createdAt: integer({ mode: "timestamp" })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
});

export type Post = InferSelectModel<typeof posts>;
export type InsertPost = InferInsertModel<typeof posts>;
