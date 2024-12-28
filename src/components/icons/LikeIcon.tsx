import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/types/components";

export default function LikeIcon(props: IconProps) {
	return (
		<Svg width={props.width || "32"} height={props.height || "32"} viewBox="0 0 32 32" {...props}>
			<Path
				fill={props.fill || "#181818"}
				stroke={props.strokeColor || "#B8B8B8"}
				strokeWidth={props.strokeWidth || "0"}
				d="M18.4999 4.96682C15.7806 2.79133 12.9999 4.96681 11.9999 5.96681C10.9999 4.96681 8.2193 2.79133 5.49996 4.96682C2.78062 7.1423 2.18961 11.6564 5.99996 15.4668C9.81031 19.2771 11.9999 19.9668 11.9999 19.9668C11.9999 19.9668 14.1896 19.2771 17.9999 15.4668C21.8103 11.6564 21.2193 7.1423 18.4999 4.96682Z"
			/>
		</Svg>
	);
}
