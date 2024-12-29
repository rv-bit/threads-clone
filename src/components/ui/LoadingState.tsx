import { Modal, StyleSheet, View } from "react-native";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
	visible: boolean;
	children: React.ReactNode;

	className?: string;
};

const LoadingState = (props: LoadingStateProps) => {
	return (
		<Modal
			animationType="none"
			transparent={true}
			visible={props.visible}
			onRequestClose={() => {
				// Prevent back button from closing the modal
			}}
		>
			<View style={styles.overlay} className={cn("", props.className)}>
				{props.children}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	},
});

export default LoadingState;
