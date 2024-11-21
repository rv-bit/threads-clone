import { router } from 'expo-router'
import { View, Text, Pressable } from 'react-native'

const Profile = () => {
	return (
		<View className='flex-1 flex-col gap-5 items-center justify-center bg-gray-500'>
			<Pressable className='bg-gray-200 p-5 rounded-lg uppercase text-white' onPress={() => router.push('/users/1')}>
				<Text>Push to user 1</Text>
			</Pressable>

			<Pressable className='bg-gray-200 p-5 rounded-lg uppercase text-white' onPress={() => router.push('/users/2')}>
				<Text>Push to user 2</Text>
			</Pressable>
		</View>
	)
}

export default Profile
