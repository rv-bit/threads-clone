import { useCallback, useState } from "react";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View, Dimensions } from "react-native";

import ContextIcon from "@/components/icons/ContextIcon";
import LikeIcon from "@/components/icons/LikeIcon";
import ShareIcon from "@/components/icons/ShareIcon";

import ContextModal from "@/components/ui/Modal"; // Adjust the import path as needed
import Separator from "@/components/ui/Separator";

type PostCardProps = {
	username: string;
	date?: string;
	avatar: string;
	content: string;
	images?: string[];
	liked?: boolean;
};

const PostCard = (props: PostCardProps) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleOpenModal = useCallback(() => {
		setModalVisible(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setModalVisible(false);
	}, []);

	const screenWidth = Dimensions.get("window").width;

	return (
		<Pressable
			onPress={() => {
				router.push("/new-post");
			}}
			className="z-10 h-fit w-full border-b-[1px] border-white/10"
		>
			{/* Header Section */}
			<View className="mt-2 flex-1 flex-row items-start gap-3 p-3">
				<Image source={{ uri: props.avatar }} style={{ width: 35, height: 35, borderRadius: 50, marginTop: 5 }} />

				<View className="flex-1 flex-col">
					<View className="flex-row items-start justify-between gap-2">
						<View className="flex-row gap-2">
							<Text className="text-md font-extrabold text-white">{props.username || "username"}</Text>
							<Text className="text-md text-gray-500">{props.date || "2h"}</Text>
						</View>
						<Pressable onPress={() => handleOpenModal()} className="h-fit w-fit">
							<ContextIcon fill="#636263" strokeWidth={0} width={28} height={24} />
						</Pressable>
					</View>

					<Text className="text-md text-white">{props.content}</Text>
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
								marginLeft: 45, // Align starting point with content/actions
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
						paddingHorizontal: 50, // Align with content and images
					}}
				>
					<Pressable onPress={() => {}}>
						<LikeIcon fill={props.liked ? "red" : "none"} strokeWidth={props.liked ? 0 : 2} width={38} height={38} />
					</Pressable>

					<Pressable onPress={() => {}}>
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
					<TouchableOpacity activeOpacity={0.7} onPress={() => {}} className="w-full items-start justify-start rounded-xl rounded-t-none bg-[#2A2A2A] p-5">
						<Text className="text-lg font-extrabold text-red-500">Delete</Text>
					</TouchableOpacity>
				</View>
			</ContextModal>
		</Pressable>
	);
};
export default PostCard;
