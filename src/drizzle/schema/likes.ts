import { sql } from "drizzle-orm";
import { sqliteTable as table, integer, text, primaryKey, foreignKey } from "drizzle-orm/sqlite-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { posts } from "./posts";

export const likes = table(
	"likes",
	{
		id: integer().primaryKey({ autoIncrement: true }),
		postId: text().notNull(),
		createdAt: integer({ mode: "timestamp" })
			.default(sql`(strftime('%s', 'now'))`)
			.notNull(),
	},
	(table) => {
		return {
			postReference: foreignKey({
				columns: [table.postId],
				foreignColumns: [posts.id],
				name: "postId_fkey",
			}),
		};
	},
);

export type Like = InferSelectModel<typeof likes>;
export type InsertLike = InferInsertModel<typeof likes>;
