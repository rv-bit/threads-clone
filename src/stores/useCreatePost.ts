import { create } from "zustand";
import { FormDataProps } from "@/types/posts";

type PostFormStore = {
	formData: FormDataProps;
	setFormData: (updater: FormDataProps | ((prevData: FormDataProps) => FormDataProps)) => void;
};

export const usePostFormStore = create<PostFormStore>((set) => ({
	formData: { content: "", images: [] },
	setFormData: (updater) =>
		set((state) => ({
			formData: typeof updater === "function" ? (updater as (prevData: FormDataProps) => FormDataProps)(state.formData) : { ...state.formData, ...updater }, // Partial update merge
		})),
}));
