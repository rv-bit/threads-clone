import { useCallback, useMemo, useState } from "react";

import { Text, ScrollView, View, TouchableHighlight, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FetchPosts } from "@/api/post";
import { usePostStore } from "@/stores/usePosts";

import PostCard from "@/components/ui/cards/post-card";

const filters = ["all", "liked", "images"];

export default function Activity() {
	const { posts, setPosts } = usePostStore();
	const [currentFilter, setCurrentFilter] = useState<string>("all");

	const [refreshing, setRefreshing] = useState<boolean>(false);

	const handleFetch = useCallback(async () => {
		const posts = await FetchPosts();

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

	const filteredPosts = useMemo(() => {
		if (!posts || posts.length === 0) return [];

		if (currentFilter === "all") return posts;
		if (currentFilter === "liked") return posts.filter((post) => post.liked);

		if (currentFilter === "images") {
			return posts.filter((post) => post.content.length === 0 && Object.keys(post.images).length > 0);
		}
	}, [posts, currentFilter]);

	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
			<View className="w-full items-center justify-center bg-[#181818] p-5">
				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full flex-row" contentContainerStyle={{ gap: 5 }}>
					{filters.map((filter) => {
						return (
							<TouchableHighlight
								activeOpacity={0.6}
								key={filter}
								className={`rounded-lg p-3 px-10 ${currentFilter === filter ? "border-none bg-[#ffffff]" : "border-[0.1rem] border-white/20 bg-[#1E1E1E]"}`}
								onPress={() => setCurrentFilter(filter)}
							>
								<Text className={`font-bold capitalize ${currentFilter === filter ? "text-black" : "text-white"}`}>{filter}</Text>
							</TouchableHighlight>
						);
					})}
				</ScrollView>
			</View>
			<FlatList
				style={{ width: "100%", flex: 1, flexGrow: 1 }}
				data={filteredPosts}
				contentContainerStyle={{
					// @ts-ignore
					color: "white",
					paddingBottom: 0,
				}}
				renderItem={({ item }) => {
					return (
						<PostCard
							key={item.id}
							id={item.id}
							username="rsvsbb"
							avatar="https://randomuser.me/api/portraits/men/75.jpg"
							content={item.content}
							images={item.images}
							imageLinks={item.imageLinks}
							liked={item.liked}
						/>
					);
				}}
				keyExtractor={(item) => item.id.toString()}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
			/>
		</SafeAreaView>
	);
}
