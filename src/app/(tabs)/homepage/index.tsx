import { useCallback, useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Fetch } from "@/api/post";
import { usePostStore } from "@/stores/usePosts";

import CreatePostCard from "@/components/ui/pages/create-post";
import PostCard from "@/components/ui/pages/post-card";

import Input from "@/components/ui/Input";

export default function Home() {
	const [searchParams, setSearchParams] = useState<string>("");
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const { posts, setPosts } = usePostStore();

	const handleFetch = useCallback(async () => {
		const posts = await Fetch();

		if (!posts) {
			return;
		}

		return posts;
	}, []);

	const handleRefresh = async () => {
		const fetchedPosts = await handleFetch();
		setRefreshing(true);

		const timeout = setTimeout(() => {
			setRefreshing(false);

			if (!fetchedPosts) {
				return;
			}
			setPosts(fetchedPosts);
		}, 2000);

		return () => clearTimeout(timeout);
	};

	useEffect(() => {
		(async () => {
			const fetchedPosts = await handleFetch();
			if (!fetchedPosts) {
				return;
			}
			setPosts(fetchedPosts);
		})();

		return () => {};
	}, []);

	return (
		<SafeAreaView className="flex-1 flex-col items-start justify-center p-5 px-0">
			<View className="mt-5 h-fit w-full items-center justify-center bg-[#181818] p-5 pb-2">
				<Input value={searchParams} onChange={(query) => setSearchParams(query)} placeholder="Search" className="h-14 w-full rounded-xl bg-[#1E1E1E] px-2 text-white" />
			</View>

			<FlatList
				style={{ width: "100%", flex: 1 }}
				data={posts}
				ListHeaderComponent={<CreatePostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" />}
				renderItem={({ item }) => (
					<PostCard
						key={item.id}
						id={item.id}
						username="rsvsbb"
						avatar="https://randomuser.me/api/portraits/men/75.jpg"
						content={item.content}
						images={item.images}
						date={item.dateTimeStamp.toLocaleTimeString()}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
			/>
		</SafeAreaView>
	);
}
