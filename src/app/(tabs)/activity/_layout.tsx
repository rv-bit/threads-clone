import { Stack } from "expo-router";

const StackLayout = () => {
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
					headerShown: false,
					headerTitle: "Activity",
				}}
			/>
		</Stack>
	);
};

export default StackLayout;
