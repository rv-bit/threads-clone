import React, { useCallback, useMemo, useState } from "react";

import { Image, Pressable, ScrollView, Text, TouchableOpacity, View, Dimensions, Share, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";

import * as Network from "expo-network";
import * as Crypto from "expo-crypto";
import * as ImageManipulator from "expo-image-manipulator";

import { cn } from "@/lib/utils";

import { DeletePost } from "@/api/post";
import { DeleteLike, InsertLike } from "@/api/likes";
import { UpdateImageLinks } from "@/api/images";

import { PostCardProps } from "@/types/posts";

import { usePostStore } from "@/stores/usePosts";

import ContextIcon from "@/components/icons/ContextIcon";
import LikeIcon from "@/components/icons/LikeIcon";
import ShareIcon from "@/components/icons/ShareIcon";

import ContextModal from "@/components/ui/ContextModal"; // Adjust the import path as needed
import Separator from "@/components/ui/Separator";
import LoadingState from "../LoadingState";

const processImage = async (dataURI: string): Promise<string> => {
	const processedImage = await ImageManipulator.manipulateAsync(
		dataURI,
		[], // No transformations
		{
			compress: 1,
			format: ImageManipulator.SaveFormat.PNG,
		},
	);

	return processedImage.uri; // Returns the file URI
};

const getFormData = async (imageURL: string | undefined): Promise<FormData> => {
	if (!imageURL) {
		throw new Error("imageURL is undefined");
	}

	// Process the image and get its URI
	const processedURI = await processImage(imageURL);

	// Construct a simple object that FormData can accept (no need for Blob creation)
	const formData = new FormData();
	formData.append("image", {
		uri: processedURI,
		name: `${Crypto.randomUUID()}.png`,
		type: "image/png", // Use the correct MIME type for the image
	} as unknown as Blob); // If needed, you can cast it to 'Blob' to satisfy TypeScript typing

	return formData;
};

const PostCard = (props: PostCardProps) => {
	const { posts, setPosts } = usePostStore();

	const [modalVisible, setModalVisible] = useState(false);
	const [shareImageLinksUploadingState, setShareImageLinksUploadingState] = useState(false);

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

	const sharedImageLinks = useMemo(() => {
		const post = posts?.find((post) => post.id === props.id);
		const { imageLinks } = post || {};

		return imageLinks;
	}, [posts, props.id]);

	const handleUploadImages = useCallback(async (images: Record<number, string>): Promise<Record<number, string>> => {
		const uploadPromises = Object.entries(images).map(async ([imageId, image]) => {
			try {
				const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.EXPO_PUBLIC_IMG_BB_API_KEY}`, {
					method: "POST",
					body: await getFormData(image),
				});

				const data = await response.json();
				const link = data.data.url;
				return { imageId, link };
			} catch (error) {
				return { imageId, link: null };
			}
		});

		const results = await Promise.all(uploadPromises);
		const uploadedImageLinks = results.reduce(
			(acc, { imageId, link }) => {
				acc[parseInt(imageId)] = link;
				return acc;
			},
			{} as Record<number, string>,
		);

		return uploadedImageLinks;
	}, []);

	const handleShareIntent = useCallback(async (shareContent: string, shareImageLinks: string[]) => {
		try {
			let content = shareContent || "";

			if (shareImageLinks.some((link) => link !== "")) {
				shareImageLinks.map((link) => {
					content = `${content}\n${link}`;
				});
			}

			const result = await Share.share({
				message: content + "\n\nShared via Local Social App",
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

	const handleOnShare = useCallback(
		async (postId: number) => {
			const post = posts?.find((post) => post.id === postId);

			const { content: shareContent, images: shareImages } = post || {};
			const shareImageLinks = sharedImageLinks;

			const network = await Network.getNetworkStateAsync();

			if (network.type !== Network.NetworkStateType.CELLULAR && network.type !== Network.NetworkStateType.WIFI) {
				Alert.alert("No internet connection");
				return;
			}

			try {
				if (shareImageLinks?.some((link) => link === "") && shareImages) {
					setShareImageLinksUploadingState(true);

					const uploadedImageLinks = await handleUploadImages(shareImages);
					const imageLinks = Object.values(uploadedImageLinks).filter((link) => link !== "");

					setShareImageLinksUploadingState(false);

					// Update the post state with the new image links
					const updatedPosts = posts?.map((post) => {
						if (post.id === postId) {
							return {
								...post,
								imageLinks: imageLinks,
							};
						}

						return post;
					});

					setPosts(updatedPosts);

					const updateResult = await UpdateImageLinks(uploadedImageLinks);
					if (updateResult.error) {
						console.error(updateResult.message);
					} else {
						console.log(updateResult.message);
					}

					handleShareIntent(shareContent || "", imageLinks);
					return;
				}

				handleShareIntent(shareContent || "", shareImageLinks || []);
			} catch (error) {
				console.error(error);
			}
		},
		[posts, setPosts],
	);

	const screenWidth = Dimensions.get("window").width;

	return (
		<>
			<LoadingState visible={shareImageLinksUploadingState} className="flex-1 items-center justify-center gap-5">
				<Text className="text-lg font-extrabold text-white">Uploading images to the cloud do not close the app...</Text>
				<ActivityIndicator size="large" color="#ffffff" />
			</LoadingState>

			<Pressable
				onLongPress={() => {
					props.onLongPress && props.onLongPress(props.id);
				}}
				className="z-10 h-fit w-full flex-row items-center justify-evenly border-b-[1px] border-white/10"
			>
				{props.isSelectionMode && (
					<View style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center", paddingLeft: 10 }}>
						<Checkbox
							style={{ height: 40, width: 40 }}
							value={props.isSelected}
							onValueChange={() => {
								props.onSelect && props.onSelect(props.id);
							}}
						/>
					</View>
				)}

				<View style={{ flex: 1 }}>
					{/* Header Section */}
					<View className={cn("flex-1 flex-row gap-3 p-3 px-5 pb-0", props.content.length > 0 ? "items-start" : "items-center")}>
						<Image source={{ uri: props.avatar }} style={{ width: 35, height: 35, borderRadius: 50, marginTop: 5 }} />

						<View className="flex-1 flex-col">
							<View className="relative flex-row items-center justify-between gap-2">
								<View className="flex-row gap-2">
									<Text className="text-lg font-extrabold text-white">{props.username || "username"}</Text>
									<Text className="text-lg text-gray-500">{props.date || "2h"}</Text>
								</View>

								{/* The ContextIcon stays in place without affecting layout */}
								<Pressable onPress={() => handleOpenModal()} style={{ position: "absolute", right: -2, top: 0.1 }}>
									<ContextIcon fill="#636263" strokeWidth={0} width={32} height={32} />
								</Pressable>
							</View>

							{props.content.length > 0 && <Text className="text-lg text-white">{props.content}</Text>}
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
									{Object.values(props.images).map((image, index) => (
										<Pressable key={index}>
											<Image
												source={{ uri: image }}
												style={{
													width: 250, // Adjust width to your preference
													height: 350,
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
									handleOnShare(props.id);
								}}
							>
								<ShareIcon fill="none" strokeWidth={2} width={38} height={38} />
							</Pressable>
						</View>
					</View>
				</View>

				{/* Context Modal */}
				<ContextModal visible={modalVisible} onClose={handleCloseModal}>
					<View className="w-full flex-1 flex-col items-start justify-start gap-0">
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								router.push({
									pathname: `/edit-post/[id]`,
									params: {
										id: props.id,
									},
								});
								handleCloseModal();
							}}
							className="w-full items-start justify-start rounded-xl rounded-b-none bg-[#2A2A2A] p-5"
						>
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
		</>
	);
};
export default PostCard;
