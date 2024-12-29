import React, { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { Alert, Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReactAnimated, { FadeIn, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { router, useLocalSearchParams } from "expo-router";

import { cn } from "@/lib/utils";

import { usePostStore } from "@/stores/usePosts";
import { PostFetchProps } from "@/types/api/post";

import Feather from "@expo/vector-icons/Feather";
import { UpdatePost } from "@/api/post";

export default function EditPost() {
	const { posts, setPosts } = usePostStore();
	const { id } = useLocalSearchParams();

	const inputRef = useRef<TextInput>(null);
	const translateY = useSharedValue(0);

	const [editPost, setEditPost] = useState<PostFetchProps>(); // Set the initial post data to the posts store data
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	const getPostData = useMemo(() => {
		if (!posts) {
			return;
		}

		return posts.find((post) => post.id === Number(id));
	}, [id]);

	const handleContentChange = useCallback(
		(value: string) => {
			setEditPost((prevData) => {
				if (!prevData) {
					return prevData;
				}

				return {
					...prevData,
					content: value,
				};
			});
		},
		[editPost],
	);

	const handleRemoveImage = useCallback(
		(index: string) => {
			Alert.alert("Remove Image", "Are you sure you want to remove this image? This action is irreversible.", [
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Remove",
					onPress: () => {
						setEditPost((prevData) => {
							if (!prevData) {
								return prevData;
							}

							return {
								...prevData,
								images: Object.fromEntries(Object.entries(prevData.images).filter(([key]) => key !== index)),
							};
						});
					},
				},
			]);
		},
		[editPost],
	);

	const handlePost = useCallback(async () => {
		if (!editPost) {
			return;
		}

		Alert.alert("Posting...", "Are you sure you want to post this?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Post",
				onPress: async () => {
					const purifyData = {
						content: editPost.content,
						images: editPost.images,
					};

					purifyData.content = purifyData.content.trim(); // remove any leading/trailing whitespace
					purifyData.content = purifyData.content.replace(/<[^>]*>?/gm, ""); // remove any HTML tags

					const { error, message } = await UpdatePost(Number(id), purifyData.content, purifyData.images);

					if (error) {
						Alert.alert("Error", message);
						return;
					}

					Alert.alert("Success", message);

					setEditPost(undefined); // Reset the post data
					router.replace("/");
				},
			},
		]);
	}, [editPost]);

	useEffect(() => {
		if (!id) {
			// If the post ID is not found, return to the previous screen
			router.back();
			return;
		}

		if (!getPostData) {
			// If the post data is not found, return to the previous screen
			router.back();
			return;
		}

		setEditPost(getPostData);
		return () => {};
	}, []);

	useEffect(() => {
		const showListener = Keyboard.addListener("keyboardWillShow", (e) => {
			setIsKeyboardVisible(true);
			translateY.value = withTiming(-e.endCoordinates.height, { duration: 150 });
		});

		const hideListener = Keyboard.addListener("keyboardWillHide", () => {
			setIsKeyboardVisible(false);
			translateY.value = withTiming(0, { duration: 150 });
		});

		return () => {
			showListener.remove();
			hideListener.remove();
		};
	}, [translateY]);

	// Create an animated style for the post button container
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	const screenWidth = Dimensions.get("window").width;

	if (!editPost) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<ReactAnimated.View entering={FadeIn} className="border-t-[3px] border-[#1C1C1C]">
			<SafeAreaView
				style={{
					width: "100%",
					height: "95%",
					backgroundColor: "#181818",
				}}
			>
				<KeyboardAvoidingView
					style={{
						flex: 1,
						width: "100%",
						height: "100%",
						gap: 10,
					}}
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>
					<ScrollView
						style={{
							width: "100%",
							height: "100%",
						}}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							flexGrow: 1, // Ensure the content takes up full space for smooth scrolling
							paddingBottom: isKeyboardVisible ? 190 : 60, // Provide space for the keyboard and actions
						}}
					>
						<View className="w-full flex-row items-start justify-start gap-3" style={styles.paddingStyles}>
							<Image source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }} style={{ width: 35, height: 35, borderRadius: 50, marginTop: 2, backgroundColor: "gray" }} />

							<View className="flex-1 flex-col items-start justify-start gap-3">
								<View className="flex-col items-start justify-start">
									<Text className="text-md font-extrabold text-white">rsvsbb</Text>
									<TextInput
										ref={inputRef}
										multiline={true}
										numberOfLines={10}
										placeholder="What's new?"
										value={editPost.content}
										onChangeText={(text) => {
											handleContentChange(text);
										}}
										className={cn("rounded-md p-0 text-sm placeholder:color-gray-500", "text-white")}
										style={{
											textAlignVertical: "top",
										}}
									/>
								</View>
							</View>
						</View>

						<View style={{ width: "100%" }}>
							{editPost.images && (
								<View
									style={{
										marginTop: Object.values(editPost.images).length > 0 ? 10 : 0,
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
											marginLeft: 55, // Align starting point with content/actions
										}}
									>
										{Object.entries(editPost.images).map(([imageId, image]) => {
											return (
												<View key={imageId}>
													<Pressable
														onPress={() => {
															handleRemoveImage(imageId);
														}}
														className="absolute right-2 top-2 z-20 rounded-full bg-black/60 p-2"
													>
														<Feather name="x" size={20} color="white" />
													</Pressable>
													<Image
														source={{ uri: image }}
														style={{
															width: 150, // Adjust width to your preference
															height: 250,
															borderRadius: 5,
														}}
													/>
												</View>
											);
										})}
									</ScrollView>
								</View>
							)}
						</View>
					</ScrollView>

					<ReactAnimated.View
						style={[
							animatedStyle,
							{
								justifyContent: "flex-end",
								alignItems: "flex-end",
								position: "absolute",
								width: "100%",
								height: 70,
								left: 0,
								bottom: isKeyboardVisible ? -80 : -50,
								backgroundColor: "#181818",
							},
						]}
						className="p-5"
					>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								handlePost();
							}}
							className="rounded-3xl bg-[#5A5A5A] px-6 py-3 text-center"
						>
							<Text className="text-black">Done</Text>
						</TouchableOpacity>
					</ReactAnimated.View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</ReactAnimated.View>
	);
}

const styles = StyleSheet.create({
	paddingStyles: {
		padding: 20,
		paddingBottom: 0,
	},
});
