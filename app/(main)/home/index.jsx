import * as schema from '@/drizzle/schema/likes';

import { Link } from 'expo-router'

import { useEffect, useState } from 'react'
import { Text, View, Pressable } from 'react-native'

import { drizzleInstance } from "@/services/drizzle.instance";

const Home = () => {
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState(null);

	const testCredentials = {
		email: 'testuser@gmail.com',
		password: 'testpassword',
	};

	const signUpWithEmail = async () => {}
	const signInWithEmail = async () => {}
	const signOutUser = async () => {}

	const insert = async () => {
		try {
			const lastPostId = await drizzleInstance.$count(schema.posts);

			await drizzleInstance.insert(schema.posts).values([
				{
					title: 'Hello, World!',
					content: `This is my ${lastPostId} post.`,
					ownerId: 1,
				},
			]);
			console.log('Inserted posts');
		} catch (error) {
			console.error('Error during insert:', error);
		}
	};

	const fetch = async () => {
		try {
			const posts = await drizzleInstance.select().from(schema.posts);
			setPosts(posts);
		} catch (error) {
			console.error('Error during fetch:', error);
		}
	}

	return (
		<View className='flex-1 flex-col gap-5 items-center justify-center bg-gray-200 p-5'>
			{user ? (
				<>
					<Text>User is signed in {user.uid}</Text>
					<Link href='/home/settings'>Push to settings</Link>
					<Link href='/users/1'>Push to user 1</Link>

					<Pressable className='bg-gray-500 p-5 rounded-lg uppercase text-white' onPress={() => signOutUser()}>
						<Text>Sign out</Text>
					</Pressable>
				</>
			) : (
				<>
					<Text>User is not signed in</Text>
					<Pressable className='bg-gray-500 p-5 rounded-lg uppercase text-white' onPress={() => signInWithEmail()}>
						<Text>Sign in with Email</Text>
					</Pressable>

					<Pressable className='bg-gray-500 p-5 rounded-lg uppercase text-white' onPress={() => signUpWithEmail()}>
						<Text>Sign up with Email</Text>
					</Pressable>

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
				</>
			)}
		</View>
	)
}

export default Home
