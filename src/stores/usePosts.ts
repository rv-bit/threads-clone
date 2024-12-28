import { create } from "zustand";
import { PostFetchProps } from "@/types/api/post";

type PostStore = {
	posts: PostFetchProps[] | undefined;
	setPosts: (posts: PostFetchProps[] | undefined) => void;
};

export const usePostStore = create<PostStore>((set) => ({
	posts: [],
	setPosts: (posts) => set({ posts }),
}));
