import * as schema from "@/drizzle/schema";
import { database } from "@/lib/database";

import { LikeProps, InsertLikeProps } from "@/types/api/likes";

export const Insert = async (postId: string) => {
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

export const Fetch = async (postId: string) => {
	try {
		return await database.select().from(schema.likes);
	} catch (error) {
		console.error("Error during fetch:", error);
	}
};
