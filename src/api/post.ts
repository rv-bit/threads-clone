import * as schema from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";

import { database } from "@/lib/database";
import { PostFetchProps } from "@/types/api/post";

export const InsertPost = async (content: string, images?: string[]) => {
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
					imageLink: "",
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

export const DeletePost = async (id: number) => {
	try {
		await database.delete(schema.posts).where(eq(schema.posts.id, id));
		await database.delete(schema.images).where(eq(schema.images.postId, id));
		await database.delete(schema.likes).where(eq(schema.likes.postId, id));

		return {
			error: false,
			message: "Post deleted successfully!",
		};
	} catch (error) {
		return {
			error: true,
			message: `Error deleting post, Error Message ${error}`,
		};
	}
};

export const UpdatePost = async (id: number, content: string, images?: Record<number, string>) => {
	try {
		const hadImages = await database.select().from(schema.images).where(eq(schema.images.postId, id));
		const countImages = hadImages.length;

		await database.update(schema.posts).set({ content }).where(eq(schema.posts.id, id));

		if (hadImages && images && Object.keys(images).length !== countImages) {
			const imageDiff = hadImages.filter((img) => !Object.values(images).includes(img.image));
			const imageIdsToDelete = imageDiff.map((img) => img.id);

			imageIdsToDelete.map(async (id) => {
				await database.delete(schema.images).where(eq(schema.images.id, id));
			});
		}

		return {
			error: false,
			message: "Post updated successfully!",
		};
	} catch (error) {
		return {
			error: true,
			message: `Error updating post, Error Message ${error}`,
		};
	}
};

export const FetchPosts = async (): Promise<PostFetchProps[] | undefined> => {
	try {
		const posts = await database.select().from(schema.posts).orderBy(desc(schema.posts.createdAt)); // finds all posts and orders them by createdAt in descending order
		const images = await database.select().from(schema.images); // finds all images that are associated with a post
		const likes = await database.select().from(schema.likes); // finds all likes

		const postsWithImages = posts.map((post) => {
			const postImages = images
				.filter((image) => image.postId === post.id)
				.reduce(
					(acc, image) => {
						acc[image.id] = image.image;
						return acc;
					},
					{} as Record<number, string>,
				);
			const postLikes = likes.filter((like) => like.postId === post.id);
			const postImageLinks = images.filter((image) => image.postId === post.id).map((image) => image.imageLink);

			return {
				id: post.id,
				content: post.content,
				images: postImages,
				imageLinks: postImageLinks,
				liked: postLikes.length > 0,
				dateTimeStamp: post.createdAt,
			};
		});

		return postsWithImages.map((post) => ({
			...post,
			imageLinks: post.imageLinks.filter((link) => link !== null) as string[],
		}));
	} catch (error) {
		console.error("Error during fetch:", error);
	}
};
