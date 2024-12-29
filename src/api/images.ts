import * as schema from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import { database } from "@/lib/database";

export const UpdateImageLinks = async (imageLinks: Record<number, string>) => {
	try {
		// Ensure all image links are valid
		const validImageLinks = Object.values(imageLinks).filter((link) => link !== "");

		if (validImageLinks.length === 0) {
			console.error("No valid image links to update:", imageLinks);
			return {
				error: true,
				message: "No valid image links to update.",
			};
		}

		// Perform the updates
		await Promise.all(
			Object.entries(imageLinks).map(([imageId, imageLink]) =>
				database
					.update(schema.images)
					.set({ imageLink: imageLink })
					.where(eq(schema.images.id, parseInt(imageId))),
			),
		);

		return {
			error: false,
			message: "Image links updated successfully!",
		};
	} catch (error) {
		console.error("Error updating image links:", error);
		return {
			error: true,
			message: `Error updating image links: ${error}`,
		};
	}
};
