import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

function App() {
	return (
		<NativeBaseProvider>
			<StatusBar />
			<Routes />
		</NativeBaseProvider>
	);
}

export default App;
