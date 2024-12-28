import { useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";

import { PostFetchProps } from "@/types/api/post";
import { Fetch } from "@/api/post";

import CreatePostCard from "@/components/ui/pages/create-post";
import PostCard from "@/components/ui/pages/post-card";

import Input from "@/components/ui/Input";

export default function Home() {
	const [searchParams, setSearchParams] = useState<string>("");
	const [posts, setPosts] = useState<PostFetchProps[] | undefined>(undefined);

	useEffect(() => {
		console.log(searchParams.trim());

		return () => {};
	}, [searchParams]);

	useEffect(() => {
		(async () => {
			const posts = await Fetch();

			if (!posts) {
				return;
			}

			setPosts(posts);
		})();

		return () => {};
	}, []);

	return (
		<SafeAreaView className="flex-1 flex-col items-start justify-center p-5 px-0">
			<View className="mt-5 h-fit w-full items-center justify-center bg-[#181818] p-5 pb-2">
				<Input value={searchParams} onChange={(query) => setSearchParams(query)} placeholder="Search" className="h-14 w-full rounded-xl bg-[#1E1E1E] px-2 text-white" />
			</View>

			<ScrollView className="h-full w-full flex-1">
				<CreatePostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" />

				{posts &&
					posts.map((post) => (
						<PostCard
							key={post.id}
							username="rsvsbb"
							avatar="https://randomuser.me/api/portraits/men/75.jpg"
							content={post.content}
							images={post.images}
							date={post.dateTimeStamp.toLocaleTimeString()}
						/>
					))}
			</ScrollView>
		</SafeAreaView>
	);
}
