import { router, Stack } from 'expo-router'
import { Pressable, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const StackLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerTitle: 'Home Page 2',
				}}
			/>

			<Stack.Screen
				name='settings'
				options={{
					headerTitle: 'Settings Page 2',
					headerStyle: {
						backgroundColor: '#ffffff',
					},
					headerLeft: () => (
						<Pressable className='flex gap-1 flex-row items-center h-fit w-fit' onPress={() => router.back()}>
							<Ionicons name='arrow-back' size={20} />
						</Pressable>
					),
				}}
			/>
		</Stack>
	)
}

export default StackLayout
