import "../global.css";

import { Text, View } from "react-native";
import { Slot, Stack } from "expo-router";

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations/migrations';

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { database, sqlInstance } from "@/lib/database";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
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
		<SafeAreaProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name='main'
					options={{
						headerTitle: '',
						headerShown: false,
					}}
				/>
			</Stack>
		</SafeAreaProvider>
	);
}