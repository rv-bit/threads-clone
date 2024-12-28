import { useCallback, useState } from "react";
import * as Network from "expo-network";

import { Image, Pressable, ScrollView, Text, TouchableOpacity, View, Dimensions, Share, Alert } from "react-native";

import { cn } from "@/lib/utils";

import { DeletePost } from "@/api/post";
import { DeleteLike, InsertLike } from "@/api/likes";

import { PostCardProps } from "@/types/posts";

import { usePostStore } from "@/stores/usePosts";

import ContextIcon from "@/components/icons/ContextIcon";
import LikeIcon from "@/components/icons/LikeIcon";
import ShareIcon from "@/components/icons/ShareIcon";

import ContextModal from "@/components/ui/ContextModal"; // Adjust the import path as needed
import Separator from "@/components/ui/Separator";

const PostCard = (props: PostCardProps) => {
	const { posts, setPosts } = usePostStore();
	const [modalVisible, setModalVisible] = useState(false);

	const handleOpenModal = useCallback(() => {
		setModalVisible(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setModalVisible(false);
	}, []);

	const handleOnDelete = useCallback(
		async (id: number) => {
			const { error, message } = await DeletePost(id);

			if (error) {
				console.error(message);
				Alert.alert("Error deleting post");
				return;
			}

			Alert.alert("Post deleted successfully!");

			const updatedPosts = posts?.filter((post) => post.id !== id);
			setPosts(updatedPosts);
		},
		[posts, setPosts],
	);

	const handleOnLike = useCallback(
		async (id: number) => {
			const post = posts?.find((post) => post.id === id);
			const isAlreadyLiked = post?.liked;

			const { error, message } = isAlreadyLiked ? await DeleteLike(id) : await InsertLike(id);

			if (error) {
				console.error(message);
				Alert.alert("Error updating like status");
				return;
			}

			Alert.alert(isAlreadyLiked ? "Post unliked!" : "Post liked!");

			const updatedPosts = posts?.map((post) => {
				if (post.id === id) {
					return {
						...post,
						liked: !isAlreadyLiked,
					};
				}

				return post;
			});

			setPosts(updatedPosts);
		},
		[posts, setPosts],
	);

	const handleOnShare = useCallback(async (shareContent: string) => {
		const network = await Network.getNetworkStateAsync();

		if (network.type !== Network.NetworkStateType.CELLULAR && network.type !== Network.NetworkStateType.WIFI) {
			Alert.alert("No internet connection");
			return;
		}

		try {
			const result = await Share.share({
				message: shareContent + "\n\nShared via Local Social App",
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					console.log("Shared with activity type of", result.activityType);
				} else {
					console.log("Shared");
				}
			} else if (result.action === Share.dismissedAction) {
				console.log("Dismissed");
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	const screenWidth = Dimensions.get("window").width;

	return (
		<Pressable onPress={() => {}} className="z-10 h-fit w-full border-b-[1px] border-white/10">
			{/* Header Section */}
			<View className={cn("flex-1 flex-row gap-3 p-3 px-5 pb-0", props.content.length > 1 ? "items-start" : "items-center")}>
				<Image source={{ uri: props.avatar }} style={{ width: 35, height: 35, borderRadius: 50, marginTop: 5 }} />

				<View className="flex-1 flex-col">
					<View className="flex-row items-center justify-between gap-2">
						<View className="flex-row gap-2">
							<Text className="text-md font-extrabold text-white">{props.username || "username"}</Text>
							<Text className="text-md text-gray-500">{props.date || "2h"}</Text>
						</View>
						<Pressable onPress={() => handleOpenModal()}>
							<ContextIcon fill="#636263" strokeWidth={0} width={32} height={32} />
						</Pressable>
					</View>

					{props.content.length > 0 && <Text className="text-md text-white">{props.content}</Text>}
				</View>
			</View>

			{/* Images and Actions Section */}
			<View style={{ width: "100%" }}>
				{props.images && (
					<View
						style={{
							marginTop: 5,
							paddingHorizontal: 10,
							width: screenWidth, // Use full screen width
						}}
					>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{
								flexDirection: "row",
								alignItems: "center",
								gap: 10,
								marginLeft: 50, // Align starting point with content/actions
							}}
						>
							{props.images.map((image, index) => (
								<Pressable key={index}>
									<Image
										source={{ uri: image }}
										style={{
											width: 150, // Adjust width to your preference
											height: 300,
											borderRadius: 5,
										}}
									/>
								</Pressable>
							))}
						</ScrollView>
					</View>
				)}

				{/* Actions Section (Like and Share Icons) */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginTop: 10,
						paddingHorizontal: 55, // Align with content and images
					}}
				>
					<Pressable
						onPress={() => {
							handleOnLike(props.id);
						}}
					>
						<LikeIcon fill={props.liked ? "#ff0000" : "#181818"} strokeWidth={props.liked ? 0 : 2} width={38} height={38} />
					</Pressable>

					<Pressable
						onPress={() => {
							handleOnShare(props.content);
						}}
					>
						<ShareIcon fill="none" strokeWidth={2} width={38} height={38} />
					</Pressable>
				</View>
			</View>

			{/* Context Modal */}
			<ContextModal visible={modalVisible} onClose={handleCloseModal}>
				<View className="w-full flex-1 flex-col items-start justify-start gap-0">
					<TouchableOpacity activeOpacity={0.7} onPress={() => {}} className="w-full items-start justify-start rounded-xl rounded-b-none bg-[#2A2A2A] p-5">
						<Text className="text-lg font-extrabold text-white">Edit</Text>
					</TouchableOpacity>
					<Separator />
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							handleOnDelete(props.id);
							handleCloseModal();
						}}
						className="w-full items-start justify-start rounded-xl rounded-t-none bg-[#2A2A2A] p-5"
					>
						<Text className="text-lg font-extrabold text-red-500">Delete</Text>
					</TouchableOpacity>
				</View>
			</ContextModal>
		</Pressable>
	);
};
export default PostCard;
