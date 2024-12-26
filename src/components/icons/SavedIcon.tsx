import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/types/components";

export default function SavedIcon(props: IconProps) {
	return (
		<Svg width={props.width || "32"} height={props.height || "32"} fill={props.fill || "none"} viewBox="0 0 32 32" {...props}>
			<Path
				fill={props.fill || "none"}
				stroke={props.strokeColor || "#B8B8B8"}
				strokeWidth={props.strokeWidth || "0"}
				d="M23.8983 7.38503C20.594 4.72027 17.2151 7.38502 16 8.60992C14.7848 7.38502 11.406 4.72027 8.10169 7.38503C4.79734 10.0498 4.07919 15.5791 8.70925 20.2464C13.3393 24.9137 16 25.7585 16 25.7585C16 25.7585 18.6607 24.9137 23.2907 20.2464C27.9208 15.5791 27.2026 10.0498 23.8983 7.38503Z"
			/>
		</Svg>
	);
}
