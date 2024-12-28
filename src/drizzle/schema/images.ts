import { sql } from "drizzle-orm";
import { sqliteTable as table, integer, text, foreignKey } from "drizzle-orm/sqlite-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { posts } from "./posts";

export const images = table("images", {
	id: integer().primaryKey({ autoIncrement: true }),
	postId: integer().notNull(),
	image: text().notNull(), // this is going to be a base64 string
	createdAt: integer({ mode: "timestamp" })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
});

export type Image = InferSelectModel<typeof images>;
export type InsertImage = InferInsertModel<typeof images>;
