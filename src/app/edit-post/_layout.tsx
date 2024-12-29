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
				name="[id]"
				options={{
					headerStyle: {
						backgroundColor: "#181818",
					},
					headerTitle: "Edit Post",
					headerTitleStyle: {
						color: "#fff",
						fontWeight: "900",
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
