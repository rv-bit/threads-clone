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
	images?: string[];
	liked?: boolean;
}
