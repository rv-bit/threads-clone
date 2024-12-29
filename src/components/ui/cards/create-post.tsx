import React from "react";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import { cn } from "@/lib/utils";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

type CreatePostCardProps = {
	username?: string;
	avatar?: string;

	className?: string;
};

const CreatePostCard = (props: CreatePostCardProps) => {
	const router = useRouter();

	const navigateToCreatePost = (state: string) => {
		router.push({
			pathname: `/new-post`,
			params: {
				action: state,
			},
		});
	};

	return (
		<Pressable
			onPress={() => {
				navigateToCreatePost("default");
			}}
			className={cn("w-full border-b-[1px] border-white/10 p-5", props.className)}
		>
			<View className="w-full flex-1 flex-row items-start gap-4">
				<Image source={{ uri: props.avatar }} style={{ width: 35, height: 35, borderRadius: 50, marginTop: 5, backgroundColor: "gray" }} />

				<View className="flex-1 flex-col items-start gap-3">
					<View className="leading-tight">
						<Text className="text-lg font-extrabold text-white">{props.username || "username"}</Text>
						<Text className="text-lg text-gray-500">What's new?</Text>
					</View>

					<View className="flex-row items-center justify-start gap-4">
						<Pressable
							onPress={() => {
								navigateToCreatePost("select-image");
							}}
						>
							<Ionicons name="images-outline" size={25} color="#636263" />
						</Pressable>

						<Pressable
							onPress={() => {
								navigateToCreatePost("take-photo");
							}}
						>
							<Feather name="camera" size={25} color="#636263" />
						</Pressable>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default CreatePostCard;
