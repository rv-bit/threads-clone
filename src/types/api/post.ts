export interface PostFetchProps {
	id: number;
	content: string;
	images: Record<number, string>;
	imageLinks: string[];
	dateTimeStamp: Date;
	liked: boolean;
}
