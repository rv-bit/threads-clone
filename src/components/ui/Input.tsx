import { Pressable, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { cn } from "@/lib/utils";

import Feather from "@expo/vector-icons/Feather";

interface InputProps {
	className?: string;
	value: string;
	placeholder?: string;

	onChange?: (value: string) => void;
	onCancel?: () => void;
}

const Input = ({ className, value, placeholder, onChange, onCancel }: InputProps) => {
	return (
		<View className={cn("flex h-12 w-full flex-row items-center justify-between rounded-md p-2", className)}>
			<TextInput
				style={{ flex: 1, height: "100%", width: "100%", color: "white" }}
				className={cn("h-full placeholder:color-white", "text-white")}
				placeholder={placeholder}
				value={value}
				onChangeText={(text) => {
					if (onChange) {
						onChange(text);
					}
				}}
			/>

			{onCancel && (
				<TouchableOpacity
					activeOpacity={0.2}
					onPress={() => {
						onCancel();
					}}
					className="flex h-full w-10 items-end justify-center"
				>
					<Feather name="x-circle" size={24} color="white" />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Input;
