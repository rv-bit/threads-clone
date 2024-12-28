export interface CameraProps {
	onCapture: (data: string) => void;
	onClose: () => void;
}

export interface PermissionDeniedViewProps {
	onPress: () => void;
}
