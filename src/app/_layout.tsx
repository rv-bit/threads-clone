import "../global.css";

import { useEffect } from "react";
import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations/migrations";

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { database, sqlInstance } from "@/lib/database";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "index",
};

export default function RootLayout() {
	const [loaded, fontsError] = useFonts({
		...FontAwesome.font,
	});

	useEffect(() => {
		if (fontsError) throw fontsError;
	}, [fontsError]);

	useDrizzleStudio(sqlInstance);

	const { success, error } = useMigrations(database, migrations);

	if (error) {
		return (
			<View>
				<Text>Migration error: {error.message}</Text>
			</View>
		);
	}

	if (!success) {
		return (
			<View>
				<Text>Migration is in progress...</Text>
			</View>
		);
	}

	return (
		<>
			{!loaded && <Text>Loading...</Text>}
			{loaded && <RootLayoutNav />}
		</>
	);
}

function RootLayoutNav() {
	return (
		<SafeAreaProvider className="flex-1 bg-black/90 p-5">
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerTitle: "",
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name="new-post"
					options={{
						presentation: "modal",
						animation: "slide_from_bottom",
						headerShown: false,
					}}
				/>
			</Stack>
		</SafeAreaProvider>
	);
}
