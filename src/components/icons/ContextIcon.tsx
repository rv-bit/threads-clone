import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/types/components";

export default function ContextIcon(props: IconProps) {
	return (
		<Svg width={props.width || "32"} height={props.height || "32"} viewBox="0 0 32 32" {...props}>
			<Path
				fill={props.fill || "#181818"}
				stroke={props.strokeColor || "#B8B8B8"}
				strokeWidth={props.strokeWidth || "0"}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.5 12C8.5 12.8284 7.82843 13.5 7 13.5C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5C7.82843 10.5 8.5 11.1716 8.5 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12ZM17 13.5C17.8284 13.5 18.5 12.8284 18.5 12C18.5 11.1716 17.8284 10.5 17 10.5C16.1716 10.5 15.5 11.1716 15.5 12C15.5 12.8284 16.1716 13.5 17 13.5Z"
			/>
		</Svg>
	);
}
