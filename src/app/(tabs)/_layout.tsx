import { Tabs } from 'expo-router'

export default () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='main'
				options={{
					headerTitle: 'Home Page',
				}}
			/>
		</Tabs>
	)
}
