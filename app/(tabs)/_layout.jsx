import { Tabs } from 'expo-router'

export default () => {
	return (
		<Tabs
			initial='home'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					headerTitle: 'Home Page',
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					headerTitle: 'Profile Page',
				}}
			/>
		</Tabs>
	)
}
