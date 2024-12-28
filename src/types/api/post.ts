export interface PostProps {
	content: string;
	images?: string[];
}

export interface PostFetchProps {
	id: number;
	content: string;
	images: string[];
	dateTimeStamp: Date;
}
