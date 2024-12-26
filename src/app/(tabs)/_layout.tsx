import { Tabs } from "expo-router";

import HomeIcon from "@/components/icons/HomeIcon";
import SavedIcon from "@/components/icons/SavedIcon";

export default () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					backgroundColor: "black",
					opacity: 0.9,
					borderTopWidth: 1,
					borderTopColor: "transparent",
					height: 75,
				},
				animation: "shift",
			}}
		>
			<Tabs.Screen
				name="homepage"
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<HomeIcon
								fill={focused ? "white" : "none"} // Set active/inactive color
								strokeWidth={focused ? 0 : 2} // Adjust icon size
								width={38} // Adjust icon size
								height={38} // Adjust icon size
							/>
						);
					},
					tabBarIconStyle: {
						width: 55,
						height: 55,
					},
					tabBarLabel: () => null,
				}}
			/>
			<Tabs.Screen
				name="activity"
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<SavedIcon
								fill={focused ? "white" : "none"} // Set active/inactive color
								strokeWidth={focused ? 0 : 2} // Adjust icon size
								width={38} // Adjust icon size
								height={38} // Adjust icon size
							/>
						);
					},
					tabBarIconStyle: {
						width: 55,
						height: 55,
					},
					tabBarLabel: () => null,
				}}
			/>
		</Tabs>
	);
};
