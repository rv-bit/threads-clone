import * as schema from '@/drizzle/schema';

import { useEffect, useState } from 'react'
import { Text, View, ScrollView, SafeAreaView } from 'react-native'

import { Fetch } from '@/api/post';

export default function Home() {
	const [posts, setPosts] = useState<schema.Post[] | null>(null);

	useEffect(() => {
		(async () => {
			const posts = await Fetch();
			setPosts(posts || []);
		})();

		return () => {
			setPosts(null);
		}
	}, []);

	return (
		<SafeAreaView className='flex-1 flex-col gap-5 items-center justify-center bg-gray-200 p-5'>
			{posts && (
				<ScrollView className='flex-1 w-full'>
					{posts.map((post) => (
						<View key={post.id}>
							<Text>{post.title}</Text>
							<Text>{post.content}</Text>
						</View>
					))}
				</ScrollView>
			)
			}
		</SafeAreaView>
	)
}