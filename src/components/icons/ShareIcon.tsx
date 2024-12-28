import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/types/components";

export default function ShareIcon(props: IconProps) {
	return (
		<Svg width={props.width || "32"} height={props.height || "32"} viewBox="0 0 32 32" {...props}>
			<Path
				fill={props.fill || "#181818"}
				stroke={props.strokeColor || "#B8B8B8"}
				strokeWidth={props.strokeWidth || "0"}
				strokeLinejoin="round"
				d="M19.5 5.5H4.5L10 11M19.5 5.5L12 18.5L10 11M19.5 5.5L10 11"
			/>
		</Svg>
	);
}
