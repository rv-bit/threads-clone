export interface FormDataProps {
	content: string;
	images: string[];
}

export interface PostCardProps {
	id: number;
	username: string;
	date?: string;
	avatar: string;
	content: string;
	images?: Record<number, string>;
	imageLinks?: string[];
	liked?: boolean;

	isSelectionMode?: boolean;
	isSelected?: boolean;
	onLongPress?: (postId: number) => void;
	onSelect?: (postId: number) => void;
}
