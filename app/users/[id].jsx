import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

const ProfilePage = () => {
	const { id } = useLocalSearchParams()
	return (
		<View>
			<Text>Profile Page {id}</Text>
		</View>
	)
}

export default ProfilePage
