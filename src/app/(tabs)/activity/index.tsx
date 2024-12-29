import { useEffect, useState } from "react";

import { Text, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Activity() {
	return (
		<SafeAreaView className="flex-1 flex-col items-start justify-center p-5 px-0">
			<View className="mt-5 h-fit w-full items-center justify-center bg-[#181818] p-5 pb-2">
				{/* <Input value={searchParams} onChange={(query) => setSearchParams(query)} placeholder="Search" className="h-14 w-full rounded-xl bg-[#1E1E1E] px-2 text-white" /> */}
				<Text className="text-2xl font-bold text-white">Activity</Text>
			</View>
			<ScrollView className="h-full w-full flex-1">
				<Text className="text-2xl font-bold text-white">Activity</Text>
			</ScrollView>
		</SafeAreaView>
	);
}
