import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Container, Icon, IconButton, TextArea } from 'native-base';

export default function Search() {
	const nav = useNavigation();

	function openResults() {
		nav.navigate('Results');
	}

	return (
		<SafeAreaView className="flex-1 items-center justify-center bg-secondary">
			<Container className="flex-1 items-center justify-center">
				<Text className=" text-center text-black font-semibold text-3xl my-1">
					Informe os ingredientes e deixe a magia acontecer!
				</Text>
				<Text className=" text-black font-semibold text-md my-4">
					O Cookix vai realizar uma busca por possíveis receitas com base nos ingredientes informados
				</Text>
				<TextArea
					backgroundColor="#fff"
					color="#000"
					textDecorationColor="#000"
					h={20}
					placeholder="Informe o ingrediente desejado!"
					w="full"
					maxW="320"
				/>
				<Button size="lg" className="bg-primary mx-auto my-4 px-16" onPress={openResults}>
					Pesquisar
				</Button>

				<IconButton
					className="bg-primary my-4"
					size="lg"
					alignItems="center"
					padding="6"
					icon={<Icon as={FontAwesome} name="microphone" />}
					borderRadius="full"
					_icon={{
						alignItems: 'center',
						marginLeft: '3',
						color: 'white',
						size: '4xl'
					}}
				/>
			</Container>
		</SafeAreaView>
	);
}
