import * as schema from "@/drizzle/schema";

import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PostCard from "@/components/ui/pages/post-card";

import { Fetch } from "@/api/post";

export default function Activity() {
	const [posts, setPosts] = useState<schema.Post[] | null>(null);

	useEffect(() => {
		(async () => {
			const posts = await Fetch();
			setPosts(posts || []);
		})();

		return () => {
			setPosts(null);
		};
	}, []);

	return (
		<SafeAreaView className="flex-1 flex-col items-start justify-center p-5">
			<ScrollView className="h-full w-full flex-1">
				<PostCard
					username="rsvsbb"
					avatar="https://randomuser.me/api/portraits/men/75.jpg"
					content="Hello, World! dawoijdwaoi dsj diojwa djioajwojd sjoi djwaoij daoiwj doijas ij"
					liked={true}
					images={[
						"https://cdn.discordapp.com/attachments/1127585380556877897/1279222724840919130/image.png?ex=676e90c0&is=676d3f40&hm=a3dc1554cc7b26e8d5612d410aa6abcec984daffca874d3043ae7a0b0183fbeb&",
						"https://cdn.discordapp.com/attachments/1127585380556877897/1279222724840919130/image.png?ex=676e90c0&is=676d3f40&hm=a3dc1554cc7b26e8d5612d410aa6abcec984daffca874d3043ae7a0b0183fbeb&",
						"https://cdn.discordapp.com/attachments/1127585380556877897/1279222724840919130/image.png?ex=676e90c0&is=676d3f40&hm=a3dc1554cc7b26e8d5612d410aa6abcec984daffca874d3043ae7a0b0183fbeb&",
						"https://cdn.discordapp.com/attachments/1127585380556877897/1279222724840919130/image.png?ex=676e90c0&is=676d3f40&hm=a3dc1554cc7b26e8d5612d410aa6abcec984daffca874d3043ae7a0b0183fbeb&",
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
