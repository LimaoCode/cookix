import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../pages/Search';
import Results from '../pages/Results';

const { Navigator, Screen } = createStackNavigator();

export function UserRoutes() {
	return (
		<Navigator>
			<Screen name="Search" component={Search} options={{ headerShown: false }} />
			<Screen
				name="Results"
				component={Results}
				options={{
					headerTitle: 'Possíveis receitas',

					headerTitleAlign: 'center',
					headerTintColor: '#5F1F15',
					headerBackTitle: 'Voltar',
					headerStyle: { backgroundColor: '#EAE5D1' },
					headerTitleStyle: {
						fontSize: 24
					}
				}}
			/>
		</Navigator>
	);
}
