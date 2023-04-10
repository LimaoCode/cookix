import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';

export default function Search({ navigation }) {
	function openResults() {
		navigation.navigate('Results');
	}

	return (
		<SafeAreaView className="flex-1 items-center justify-center bg-red-800">
			<Text className=" text-white font-semibold text-6xl">Pesquisa</Text>

			<Button
				className=" bg-amber-100 text-black font-semibold text-lg"
				title="Pesquisar"
				onPress={openResults}
			/>
		</SafeAreaView>
	);
}
