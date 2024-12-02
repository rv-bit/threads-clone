import * as schema from '@/drizzle/schema';
import { database } from "@/lib/database";

import { PostProps } from '@/types/post';

export const Insert = async (title: string, content: string, images?: string[]): Promise<PostProps | undefined> => {
    try {
        await database.insert(schema.posts).values([
            {
                title: title,
                content: content,
                images: JSON.stringify(images),
            },
        ]);

        return {
            title: title,
            content: content,
            images: images,
        };
    } catch (error) {
        console.error('Error during insert:', error);
    }
};

export const Fetch = async () => {
    try {
        const posts = await database.select().from(schema.posts)
        return posts as schema.Post[] || [];
    } catch (error) {
        console.error('Error during fetch:', error);
    }
}