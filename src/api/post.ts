import * as schema from "@/drizzle/schema";
import { asc, desc } from "drizzle-orm";

import { database } from "@/lib/database";
import { PostFetchProps } from "@/types/api/post";

export const Insert = async (content: string, images?: string[]) => {
	try {
		const postIdResult = await database
			.insert(schema.posts)
			.values([
				{
					content: content,
				},
			])
			.returning({
				insertedId: schema.posts.id,
			});

		if (!postIdResult || postIdResult.length === 0) {
			return {
				error: true,
				message: "Error creating post",
			};
		}

		const insertedId = postIdResult[0]?.insertedId;

		if (insertedId === undefined) {
			return {
				error: true,
				message: "Error creating post, insertedId is undefined",
			};
		}

		if (images && images.length > 0) {
			const imageInsertPromises = images.map((image) =>
				database.insert(schema.images).values({
					postId: insertedId,
					image: image,
				}),
			);
			await Promise.all(imageInsertPromises);
		}

		return {
			error: false,
			message: "Post created successfully!",
		};
	} catch (error) {
		return {
			error: true,
			message: `Error creating post, Error Message ${error}`,
		};
	}
};

export const Fetch = async (): Promise<PostFetchProps[] | undefined> => {
	try {
		const posts = await database.select().from(schema.posts).orderBy(desc(schema.posts.createdAt)); // finds all posts and orders them by createdAt in descending order
		const images = await database.select().from(schema.images); // finds all images, this is not efficient but it's fine for now

		const postsWithImages = posts.map((post) => {
			const postImages = images.filter((image) => image.postId === post.id).map((image) => image.image);

			return {
				id: post.id,
				content: post.content,
				images: postImages,
				dateTimeStamp: post.createdAt,
			};
		});

		return postsWithImages;
	} catch (error) {
		console.error("Error during fetch:", error);
	}
};
