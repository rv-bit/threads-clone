import * as schema from "@/drizzle/schema";

import { useEffect, useState } from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";

import { Fetch } from "@/api/post";

export default function Activity() {
	const [posts, setPosts] = useState<schema.Post[] | null>(null);

	useEffect(() => {
		(async () => {
			const posts = await Fetch();
			setPosts(posts || []);
		})();

		return () => {
			setPosts(null);
		};
	}, []);

	return (
		<SafeAreaView className="h-full w-full flex-1 flex-col items-center justify-center gap-5">
			<ScrollView className="mt-10 h-full w-full">
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
				<Text>Activity</Text>
			</ScrollView>

			{/* {posts && (
				<ScrollView className="w-full flex-1">
					{posts.map((post) => (
						<View key={post.id}>
							<Text>{post.title}</Text>
							<Text>{post.content}</Text>
						</View>
					))}
				</ScrollView>
			)} */}
		</SafeAreaView>
	);
}
