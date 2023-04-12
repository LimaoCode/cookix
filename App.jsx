import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';

function App() {
	return (
		<NativeBaseProvider>
			<StatusBar />
			<Routes />
		</NativeBaseProvider>
	);
}

export default App;
