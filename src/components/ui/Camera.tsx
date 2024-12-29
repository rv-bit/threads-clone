import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from "react-native";
import { Dimensions } from "react-native";

import * as Linking from "expo-linking";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

type CameraContextProps = {
	showCamera: (onCapture: (image: string) => void) => void;
	hideCamera: () => void;
};

const CameraContext = createContext<CameraContextProps | undefined>(undefined);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [onCaptureCallback, setOnCaptureCallback] = useState<((image: string) => void) | null>(null);

	const showCamera = (onCapture: (image: string) => void) => {
		setOnCaptureCallback(() => onCapture);
		setIsVisible(true);
	};

	const hideCamera = () => {
		setOnCaptureCallback(null);
		setIsVisible(false);
	};

	return (
		<CameraContext.Provider value={{ showCamera, hideCamera }}>
			<View style={{ flex: 1 }}>
				{children}
				{isVisible && (
					<View style={styles.overlay}>
						<CameraViewComponent
							onCapture={(image) => {
								if (onCaptureCallback) onCaptureCallback(image);
								hideCamera();
							}}
							onClose={hideCamera}
						/>
					</View>
				)}
			</View>
		</CameraContext.Provider>
	);
};

export const useCamera = () => {
	const context = useContext(CameraContext);
	if (!context) {
		throw new Error("useCamera must be used within a CameraProvider");
	}
	return context;
};

const CameraViewComponent = ({ onCapture, onClose }: { onCapture: (image: string) => void; onClose: () => void }) => {
	const [permission, requestPermission] = useCameraPermissions();
	const [facing, setFacing] = useState<CameraType>("back");
	const cameraRef = React.useRef<CameraView | null>(null);

	const handleRequestPermission = async () => {
		const result = await requestPermission();
		if (!result.granted) {
			Alert.alert("Permission Required", "Camera access is needed to use this feature. Please enable it in settings.", [
				{ text: "Cancel", style: "cancel" },
				{ text: "Open Settings", onPress: () => Linking.openSettings() },
			]);
		}
	};

	if (!permission) {
		return <Text>Loading...</Text>;
	}

	if (!permission.granted) {
		return (
			<View style={styles.permissionView}>
				<Text style={styles.permissionText}>Camera permission is required.</Text>
				<Button title="Grant Permission" onPress={handleRequestPermission} />
			</View>
		);
	}

	const handleTakePicture = async () => {
		if (!cameraRef.current) return;

		const photo = await cameraRef.current.takePictureAsync();

		if (photo && onCapture) {
			onCapture(photo?.uri);
		}
	};

	return (
		<View style={styles.container}>
			<CameraView style={styles.camera} facing={facing} ratio="4:3" ref={cameraRef}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={onClose}>
						<Text style={styles.text}>Close</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => handleTakePicture()}>
						<Text style={styles.text}>Capture</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => setFacing(facing === "back" ? "front" : "back")}>
						<Text style={styles.text}>Flip</Text>
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		zIndex: 1000, // Ensures it renders above everything
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	permissionView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	permissionText: {
		textAlign: "center",
		marginBottom: 10,
	},
	container: {
		flex: 1,
		justifyContent: "center",
	},
	message: {
		textAlign: "center",
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
});
