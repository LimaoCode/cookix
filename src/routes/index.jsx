import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeWindStyleSheet } from 'nativewind';
import { UserRoutes } from './stack.routes';

NativeWindStyleSheet.setOutput({
	default: 'native'
});

export function Routes() {
	return (
		<NavigationContainer>
			<UserRoutes />
		</NavigationContainer>
	);
}
