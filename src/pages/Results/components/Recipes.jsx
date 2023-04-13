// import React from 'react';
// import { VStack, Box, Divider, Text, Container, Button } from 'native-base';
// import { useRoute } from '@react-navigation/native';

// export default function Recipes() {
// 	const route = useRoute();

// 	const recipes = route.params?.recipes;

// 	console.log('dentro dos cards', recipes);

// 	if (recipes === undefined) {
// 		return (
// 			<Container className="flex-1 items-center justify-center mt-4">
// 				<Text className=" text-center text-black font-semibold text-2xl my-1">
// 					Não encontramos receitas com os ingredientes citados!
// 				</Text>
// 				<Button
// 					size="lg"
// 					w="full"
// 					className="bg-primary mx-auto my-4 px-16 truncate"
// 					onPress={() => nav.navigate('Search')}
// 				>
// 					Retornar para a pesquisa
// 				</Button>
// 			</Container>
// 		);
// 	}

// 	// <SafeAreaView className="flex-1 items-center justify-center bg-secondary">
// 	// 	<Container className="mt-4">
// 	// 		<ScrollView showsVerticalScrollIndicator={false}>
// 	// 			<Text className=" text-center text-black font-semibold text-3xl my-1">
// 	// 				Houve um erro ao apresentar as receitas!
// 	// 			</Text>
// 	// 			<Button size="lg" className="bg-primary mx-auto my-4 px-16" onPress={() => nav.navigate('Search')}>
// 	// 				Voltar para a tela de pesquisa
// 	// 			</Button>
// 	// 		</ScrollView>
// 	// 	</Container>
// 	// </SafeAreaView>;

// 	return recipes.map(({ title, description }) => (
// 		<Box border="1" borderRadius="md" className="bg-third mb-4">
// 			<VStack space="4" divider={<Divider />}>
// 				<Box className=" items-center px-4 pt-4">{title}</Box>
// 				<Box className=" items-center px-4 pb-4">{description}</Box>
// 			</VStack>
// 		</Box>
// 	));
// }
