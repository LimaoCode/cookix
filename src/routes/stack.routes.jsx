import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../pages/Search';
import Results from '../pages/Results';

const { Navigator, Screen } = createNativeStackNavigator();

export function UserRoutes() {
	return (
		<Navigator>
			<Screen name="Search" component={Search} options={{ headerShown: false }} />
			<Screen name="Results" component={Results} />
		</Navigator>
	);
}
