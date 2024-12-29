import React, { useEffect } from "react";
import { Modal, StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS, withTiming } from "react-native-reanimated";

interface ContextModalProps {
	visible: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const ContextModal: React.FC<ContextModalProps> = ({ visible, onClose, children }) => {
	const translateY = useSharedValue(0);
	const MAX_TRANSLATE_Y = 0; // Adjust this value as needed

	useEffect(() => {
		if (visible) {
			translateY.value = withTiming(0, { duration: 300 });
		}

		return () => {
			translateY.value = withTiming(0, { duration: 300 });
		};
	}, [visible]);

	const gesture = Gesture.Pan()
		.onUpdate((event) => {
			translateY.value = Math.max(event.translationY, MAX_TRANSLATE_Y);
		})
		.onEnd((event) => {
			if (event.translationY > 100) {
				runOnJS(onClose)();
			} else {
				translateY.value = withTiming(0, { duration: 300 });
			}
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={visible}
			onRequestClose={() => {
				// Prevent back button from closing the modal
			}}
		>
			<View style={styles.overlay}>
				<TouchableWithoutFeedback onPress={onClose}>
					<View style={styles.touchableArea} />
				</TouchableWithoutFeedback>
				<GestureDetector gesture={gesture}>
					<Animated.View style={[styles.modalContent, animatedStyle]}>
						<View className="mb-2 h-[0.35rem] w-14 self-center rounded-xl bg-[#A8A8A8]" />
						{children}
					</Animated.View>
				</GestureDetector>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "flex-end",
	},
	touchableArea: {
		flex: 1,
	},
	modalContent: {
		width: "100%",
		minHeight: "25%",
		height: "auto",
		backgroundColor: "#1F1F1F",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		gap: 30,
	},
});

export default ContextModal;
