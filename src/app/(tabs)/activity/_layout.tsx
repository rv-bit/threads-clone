import { Stack } from "expo-router";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				headerBackVisible: false,
				contentStyle: {
					backgroundColor: "#181818",
				},
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
					headerTitle: "Activity",
				}}
			/>
		</Stack>
	);
}
