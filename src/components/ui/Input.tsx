import { Text, TextInput, View } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps {
	className?: string;
	title?: string;
	value: string;
	placeholder?: string;
	onChange?: (value: string) => void;
}

export default function Input({ className, title, value, placeholder, onChange }: InputProps) {
	return (
		<View className={cn(className, "flex flex-col gap-1")}>
			{title && <Text className="text-sm font-semibold">{title}</Text>}

			<TextInput
				className={cn(className, "h-10 w-full rounded-md border border-gray-300 p-2")}
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
