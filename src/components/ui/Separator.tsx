import { View } from "react-native";
import { cn } from "@/lib/utils";

interface InputProps {
	className?: string;
}

const Separator = (props: InputProps) => {
	return <View className={cn(props.className, "h-[1px] w-full bg-[#323232]")} />;
};

export default Separator;
