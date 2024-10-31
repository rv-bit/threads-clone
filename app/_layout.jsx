import * as schema from '../drizzle/schema/index';

import { Stack } from "expo-router";
import { Text, View } from 'react-native';

import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

import { applyMigrations } from "@/services/drizzle.migration";
import { sqlInstance, drizzleInstance } from "@/services/drizzle.instance";

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
                name='(main)'
                options={{
                    headerTitle: '',
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
