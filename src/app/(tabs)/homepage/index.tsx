import { useCallback, useEffect, useMemo, useState } from "react";
import { View, RefreshControl, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

import { DeletePost, FetchPosts } from "@/api/post";
import { usePostStore } from "@/stores/usePosts";

import { PostFetchProps } from "@/types/api/post";

import CreatePostCard from "@/components/ui/cards/create-post";
import PostCard from "@/components/ui/cards/post-card";

import Input from "@/components/ui/Input";

export default function Home() {
	const { posts, setPosts } = usePostStore();

	const [isSelectionMode, setIsSelectionMode] = useState(false);
	const [selectedToDelete, setSelectedToDelete] = useState<number[]>([]);

	const [searchParams, setSearchParams] = useState<string>("");
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const handleLongPress = (postId: number) => {
		setIsSelectionMode(true);
		toggleSelect(postId);
	};

	const toggleSelect = (postId: number) => {
		setSelectedToDelete((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]));
	};

	const handleDeleteSelectedPosts = useCallback(async () => {
		setIsSelectionMode(false);

		if (selectedToDelete.length === 0) {
			return;
		}

		const postsToBeDeleted = await Promise.all(selectedToDelete.map((id) => DeletePost(id)));

		if (!postsToBeDeleted) {
			return;
		}

		const updatedPosts = posts?.filter((post) => !selectedToDelete.includes(post.id));

		setPosts(updatedPosts);
		setSelectedToDelete([]);
	}, [selectedToDelete]);

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

	useEffect(() => {
		(async () => {
			const fetchedPosts = await handleFetch();
			if (!fetchedPosts) {
				return;
			}
			setPosts(fetchedPosts);
		})();

		return () => {};
	}, [handleFetch, setPosts]);

	const filteredPosts = useMemo(() => {
		const filteredSearchParams = searchParams.trim(); // Remove white spaces from the search params from the start and end
		if (!filteredSearchParams) {
			return posts;
		}

		return posts?.filter((post: PostFetchProps) => post.content.toLowerCase().includes(filteredSearchParams.toLowerCase()));
	}, [posts, searchParams]);

	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
			<View className="mt-5 h-fit w-full flex-row items-center justify-between bg-[#181818] p-5 pb-2">
				<Input
					value={searchParams}
					onChange={(query) => setSearchParams(query)}
					onCancel={() => setSearchParams("")}
					placeholder="Search"
					className="h-14 w-full rounded-xl bg-[#1E1E1E] px-3"
				/>
			</View>

			<FlatList
				style={{ width: "100%", flex: 1 }}
				contentContainerStyle={{
					// @ts-ignore
					color: "white",
					paddingBottom: isSelectionMode ? 90 : 0,
				}}
				data={filteredPosts}
				ListHeaderComponent={<CreatePostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" />}
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
							date={item.dateTimeStamp.toLocaleTimeString()}
							isSelectionMode={isSelectionMode}
							isSelected={selectedToDelete.includes(item.id)}
							onLongPress={() => handleLongPress(item.id)}
							onSelect={() => toggleSelect(item.id)}
						/>
					);
				}}
				keyExtractor={(item) => item.id.toString()}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
			/>

			{isSelectionMode && (
				<View className="absolute bottom-0 h-fit w-full flex-1 flex-row items-center justify-between bg-[#181818] p-5 pb-2">
					<Button title="Delete" onPress={() => handleDeleteSelectedPosts()} />
					<Button title="Cancel" onPress={() => setIsSelectionMode(false)} />
				</View>
			)}
		</SafeAreaView>
	);
}
