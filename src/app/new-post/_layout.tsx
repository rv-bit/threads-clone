import { router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerBackVisible: false,
				contentStyle: {
					backgroundColor: "#181818",
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerStyle: {
						backgroundColor: "#181818",
					},
					headerTitle: "New Post",
					headerTitleStyle: {
						color: "#fff",
						fontWeight: "bold",
					},
					headerLeft() {
						return (
							<View>
								<Pressable
									onPress={() => {
										router.back();
									}}
								>
									<View>
										<Text className="font-medium text-white">Cancel</Text>
									</View>
								</Pressable>
							</View>
						);
					},
				}}
			/>
		</Stack>
	);
}
