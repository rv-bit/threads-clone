import * as schema from "@/drizzle/schema";

import { useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";

import CreatePostCard from "@/components/ui/pages/create-post";
import PostCard from "@/components/ui/pages/post-card";

import Input from "@/components/ui/Input";

export default function Home() {
	const [searchParams, setSearchParams] = useState<string>("");
	const [posts, setPosts] = useState<schema.Post[] | null>(null);

	useEffect(() => {
		console.log(searchParams.trim());

		return () => {};
	}, [searchParams]);

	return (
		<SafeAreaView className="flex-1 flex-col items-start justify-center p-5 px-0">
			<View className="mt-5 h-fit w-full items-center justify-center bg-[#181818] p-5 pb-2">
				<Input value={searchParams} onChange={(query) => setSearchParams(query)} placeholder="Search" className="h-14 w-full rounded-xl bg-[#1E1E1E] px-2 text-white" />
			</View>

			<ScrollView className="h-full w-full flex-1">
				<CreatePostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" />

				<PostCard
					username="rsvsbb"
					avatar="https://randomuser.me/api/portraits/men/75.jpg"
					content="Hello, World! dawoijdwaoi dsj diojwa djioajwojd sjoi djwaoij daoiwj doijas i dwaoijd awjoi jdaowdo jawj dawoij doawji jdaiowj jd oawjod jawj doawji doijawd ijawoi jdoawij doiawj odijawoij daw"
					liked={true}
					images={[
						"https://cdn.discordapp.com/attachments/1200437409981157407/1322071165753229322/IMG_0606.png?ex=676f8a38&is=676e38b8&hm=c9bfb7e1b63737718b76eb15b77797b58a2f3eacf26c9ab325d9605a26d69498&",
						"https://cdn.discordapp.com/attachments/1200437409981157407/1322071165753229322/IMG_0606.png?ex=676f8a38&is=676e38b8&hm=c9bfb7e1b63737718b76eb15b77797b58a2f3eacf26c9ab325d9605a26d69498&",
						"https://cdn.discordapp.com/attachments/1200437409981157407/1322071165753229322/IMG_0606.png?ex=676f8a38&is=676e38b8&hm=c9bfb7e1b63737718b76eb15b77797b58a2f3eacf26c9ab325d9605a26d69498&",
						"https://cdn.discordapp.com/attachments/1200437409981157407/1322071165753229322/IMG_0606.png?ex=676f8a38&is=676e38b8&hm=c9bfb7e1b63737718b76eb15b77797b58a2f3eacf26c9ab325d9605a26d69498&",
					]}
				/>
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
				<PostCard username="rsvsbb" avatar="https://randomuser.me/api/portraits/men/75.jpg" content="Hello, World!" />
			</ScrollView>
		</SafeAreaView>
	);
}
