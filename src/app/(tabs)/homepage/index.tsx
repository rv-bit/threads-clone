import * as schema from "@/drizzle/schema";

import { useEffect, useState } from "react";
import { Text, View, ScrollView, SafeAreaView, Pressable } from "react-native";
import { router } from "expo-router";

import { Fetch } from "@/api/post";

export default function Home() {
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
		<SafeAreaView className="flex-1 flex-col items-start justify-center p-5">
			<Pressable
				onPress={() => {
					router.push("/new-post");
				}}
				className="h-fit w-full flex-col items-start justify-start gap-2 border-b-2 border-white p-5"
			>
				<View className="w-full flex-col items-start justify-center gap-1">
					<Text className="text-xl font-bold text-white">username</Text>
					<Text className="text-md text-gray-500">What's new?</Text>
				</View>
			</Pressable>

			{posts && (
				<ScrollView className="h-full w-full flex-1">
					{/* {posts.map((post) => (
						<View key={post.id}>
							<Text>{post.title}</Text>
							<Text>{post.content}</Text>
						</View>
					))} */}
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
			)}
		</SafeAreaView>
	);
}
