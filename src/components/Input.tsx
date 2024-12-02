import React from "react";

import { Text, TextInput, View } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps {
    className?: string;
    title: string;
    value: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export default function Input({ className, title, value, placeholder, onChange }: InputProps) {
    return (
        <View className={cn(className, 'flex flex-col gap-1')}>
            <Text className='text-sm font-semibold'>{title}</Text>
            <TextInput
                className={cn(className, 'w-full h-10 border border-gray-300 rounded-md p-2')}
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => {
                    if (onChange) {
                        onChange(text);
                    }
                }}
            />
        </View>
    );
}