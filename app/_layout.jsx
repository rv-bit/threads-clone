import * as schema from '../db/schema';

import { Stack } from "expo-router";
import { Text, View } from 'react-native';

import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

import { applyMigrations } from "@/db/migration";
import { sqlInstance, drizzleInstance } from "@/db";

export default function RootLayout() {
    useDrizzleStudio(sqlInstance);

    const { success, error } = applyMigrations(drizzleInstance);
    
    if (error) {
        console.error(error);

        return (
            <View className='flex-1 justify-center items-center'>
                <Text>{error.message}</Text>
            </View>
        );
    }

    if (!success) {
        return (
            <View className='flex-1 justify-center items-center'>
                <Text>Loading...</Text>
            </View>
        )
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
