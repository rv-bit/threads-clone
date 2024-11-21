import "../global.css";

import { Text, View } from "react-native";
import { Slot, Stack } from "expo-router";

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations/migrations';

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { database, sqlInstance } from "@/lib/database";

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
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='(tabs)'
				options={{
					headerTitle: '',
					headerShown: false,
				}}
			/>
		</Stack>
	);
}