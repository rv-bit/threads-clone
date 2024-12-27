import { Text, TextInput, View } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps {
	className?: string;
	title?: string;
	value: string;
	placeholder?: string;
	onChange?: (value: string) => void;
}

const Input = ({ className, title, value, placeholder, onChange }: InputProps) => {
	return (
		<View className={cn(className, "flex flex-col gap-1")}>
			{title && <Text className="text-sm font-semibold">{title}</Text>}

			<TextInput
				className={cn("h-10 w-full rounded-md p-2 placeholder:color-white", className)}
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
};

export default Input;
