import { useCallback, useState } from "react";
import { Image, Pressable, Text, View, Share, Alert } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

import * as ImagePicker from "expo-image-picker";

import Input from "@/components/ui/Input";

export default function CreatePost() {
	const [content, setContent] = useState("");
	const [images, setImages] = useState<string[]>([]);

	const handleContentChange = useCallback((value: string) => {
		setContent(value);
	}, []);

	const onAddImages = useCallback(async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			Alert.alert("Permission required", "Camera roll permissions are needed to add images.");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos"],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.6,
			base64: true,
		});

		if (!result.canceled) {
			const uri = `data:image/png;base64,${(result.assets[0] as { base64: string }).base64}`;
			setImages([...images, uri]);
		}
	}, [images]);

	const onShare = useCallback(async () => {
		try {
			const result = await Share.share({
				message: "React Native",
				url: "https://reactnative.dev",
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

	return (
		<Animated.View entering={FadeIn} className="flex-1 items-center justify-center border-t-[3px] border-[#1C1C1C]">
			<Animated.View
				entering={SlideInDown}
				style={{
					width: "90%",
					height: "100%",
				}}
				className="items-start justify-start py-5"
			>
				<View className="flex h-full w-full flex-col items-start justify-start gap-3">
					<Input title="Content" placeholder="Content" value={content} onChange={handleContentChange} className="w-full" />

					<Pressable onPress={onAddImages} className="h-10 w-full items-center justify-center rounded-md bg-blue-500">
						<Text style={{ color: "white" }}>Add Images</Text>
					</Pressable>

					{images.length > 0 && (
						<View className="flex w-full flex-row gap-2">
							{images.map((image) => (
								<Image key={image} source={{ uri: image }} style={{ width: 100, height: 100 }} />
							))}
						</View>
					)}

					<Pressable onPress={onShare} className="h-10 w-full items-center justify-center rounded-md bg-blue-500">
						<Text style={{ color: "white" }}>Share</Text>
					</Pressable>

					{/* <View className="flex flex-col gap-2">
						<Text style={{ fontWeight: "bold", marginBottom: 10 }}>Modal Screen</Text>
						<Pressable
							onPress={() => {
								router.back();
							}}
						>
							<Text style={{ color: "blue" }}>← Go back</Text>
						</Pressable>
					</View> */}
				</View>
			</Animated.View>
		</Animated.View>
	);
}
