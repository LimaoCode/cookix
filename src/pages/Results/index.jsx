import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';

export default function Results() {
	return (
		<SafeAreaView className="flex-1 items-center justify-center bg-red-800">
			<Text className=" text-white font-semibold text-6xl">Resultados</Text>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}
