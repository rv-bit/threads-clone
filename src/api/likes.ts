import * as schema from "@/drizzle/schema";
import { database } from "@/lib/database";

import { eq } from "drizzle-orm";

export const InsertLike = async (postId: number) => {
	try {
		await database.insert(schema.likes).values([
			{
				postId: postId,
			},
		]);

		return {
			error: false,
			message: "Like created successfully!",
		};
	} catch (error) {
		return {
			error: true,
			message: `Error creating post, Error Message ${error}`,
		};
	}
};

export const DeleteLike = async (postId: number) => {
	try {
		await database.delete(schema.likes).where(eq(schema.likes.postId, postId));

		return {
			error: false,
			message: "Like deleted successfully!",
		};
	} catch (error) {
		return {
			error: true,
			message: `Error deleting post, Error Message ${error}`,
		};
	}
};
