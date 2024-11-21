import * as schema from '@/drizzle/schema';

import { Link } from 'expo-router'

import { useEffect, useState } from 'react'
import { Text, View, Pressable } from 'react-native'

import { database } from "@/lib/database";

const Home = () => {
	const [posts, setPosts] = useState<schema.Post[] | null>(null);

	const insert = async () => {
		try {
			const lastPostId = await database.$count(schema.posts);

			await database.insert(schema.posts).values([
				{
					title: 'Hello, World!',
					content: `This is my ${lastPostId} post.`,
				},
			]);
			console.log('Inserted posts');
		} catch (error) {
			console.error('Error during insert:', error);
		}
	};

	const fetch = async () => {
		try {
			const posts = await database.select().from(schema.posts)
			setPosts(posts);
		} catch (error) {
			console.error('Error during fetch:', error);
		}
	}

	return (
		<View className='flex-1 flex-col gap-5 items-center justify-center bg-gray-200 p-5'>
			<Link href='/home/settings'>Push to settings</Link>
			<Link href='/users/1'>Push to user 1</Link>

			<Pressable className='bg-gray-500 p-5 rounded-lg uppercase text-white' onPress={() => insert()}>
				<Text>Insert</Text>
			</Pressable>

			<Pressable className='bg-gray-500 p-5 rounded-lg uppercase text-white' onPress={() => fetch()}>
				<Text>Fetch</Text>
			</Pressable>

			{posts && (
				<View>
					{posts.map((post) => (
						<View key={post.id}>
							<Text>{post.title}</Text>
							<Text>{post.content}</Text>
						</View>
					))}
				</View>
			)}
		</View>
	)
}

export default Home
