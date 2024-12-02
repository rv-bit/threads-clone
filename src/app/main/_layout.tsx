import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { Stack } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const StackLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerTitle: 'Home Page',
					headerRight: () => (
						<Pressable
							onPress={() => {
								router.push("/main/post");
							}}
						>
							<AntDesign name='plus' size={24} color='black' />
						</Pressable>
					),
				}}
			/>

			<Stack.Screen
				name="post"
				options={{
					presentation: 'modal',
					animation: 'slide_from_bottom',
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default StackLayout;