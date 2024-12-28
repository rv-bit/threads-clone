import React, { useCallback, useState, useRef, useEffect } from "react";
import { Image, Pressable, Text, View, Alert, ScrollView, Dimensions, TextInput, Keyboard, Platform, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReactAnimated, { FadeIn, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { cn } from "@/lib/utils";
import { InsertPost } from "@/api/post";

import { usePostFormStore } from "@/stores/useCreatePost";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useCamera } from "@/components/ui/Camera";

export default function CreatePost() {
	const inputRef = useRef<TextInput>(null);

	const { showCamera } = useCamera();
	const { formData, setFormData } = usePostFormStore();

	const translateY = useSharedValue(0);

	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

	const handleContentChange = useCallback((value: string) => {
		setFormData((prevData) => ({
			...prevData,
			content: value,
		}));
	}, []);

	const handleOnPost = useCallback(async () => {
		const purifyData = {
			content: formData.content,
			images: formData.images,
		};

		purifyData.content = purifyData.content.trim(); // remove any leading/trailing whitespace
		purifyData.content = purifyData.content.replace(/<[^>]*>?/gm, ""); // remove any HTML tags

		const { error, message } = await InsertPost(purifyData.content, purifyData.images);

		if (error) {
			Alert.alert("Error", message);
			return;
		}

		Alert.alert("Success", message);

		setFormData({
			content: "",
			images: [],
		});

		// Navigate to the home screen
		router.replace("/");
	}, [formData]);

	const handleOnAddImages = useCallback(async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			Alert.alert("Permission required", "Camera roll permissions are needed to add images.");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.6,
			base64: true,
		});

		if (!result.canceled) {
			const uri = `data:image/png;base64,${(result.assets[0] as { base64: string }).base64}`;
			setFormData((prevData) => ({
				...prevData,
				images: [...prevData.images, uri],
			}));
		}
	}, [formData]);

	const handleCapture = (image: string) => {
		router.push("/new-post"); // Close the camera view after capturing the image

		setFormData((prevData) => ({
			...prevData,
			images: [...prevData.images, image],
		}));
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current?.focus();
		}

		return () => {};
	}, [inputRef]);

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
							<Image source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }} style={{ width: 35, height: 35, borderRadius: 50, marginTop: 2 }} />

							<View className="flex-1 flex-col items-start justify-start gap-3">
								<View className="flex-col items-start justify-start">
									<Text className="text-md font-extrabold text-white">rsvsbb</Text>
									<TextInput
										ref={inputRef}
										multiline={true}
										numberOfLines={10}
										placeholder="What's new?"
										value={formData.content}
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
							{formData.images && (
								<View
									style={{
										marginTop: formData.images.length > 0 ? 10 : 0,
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
										{formData.images.map((image, index) => (
											<View key={index}>
												<Pressable
													onPress={() => {
														setFormData((prevData) => ({
															...prevData,
															images: prevData.images.filter((_, i) => i !== index),
														}));
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
										))}
									</ScrollView>
								</View>
							)}

							{/* Actions Section (Like and Share Icons) */}
							<View
								style={[
									{
										marginTop: formData.images.length > 0 ? 15 : 5,
										flexDirection: "row",
										alignItems: "flex-start",
										gap: 10,
										marginLeft: 65, // Align with content and images
									},
								]}
							>
								<Pressable
									onPress={() => {
										handleOnAddImages();
									}}
								>
									<Ionicons name="images-outline" size={25} color="#636263" />
								</Pressable>
								<Pressable
									onPress={() => {
										router.dismiss(); // Close the modal for now

										showCamera(handleCapture);
									}}
								>
									<Feather name="camera" size={25} color="#636263" />
								</Pressable>
							</View>
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
						<TouchableOpacity activeOpacity={0.7} onPress={handleOnPost} className="rounded-3xl bg-[#5A5A5A] px-6 py-3 text-center">
							<Text className="text-black">Post</Text>
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
