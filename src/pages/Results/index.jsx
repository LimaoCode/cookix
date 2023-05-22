import React from 'react';
import { SafeAreaView } from 'react-native';
import { Container, Button, ScrollView, VStack, Box, Divider } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Results() {
	const route = useRoute();
	const nav = useNavigation();

	const recipes = route.params.recipeJSON;

	const handlePress = () => {
		nav.reset({ index: 0, routes: [{ name: 'Search' }] });
	};

	return (
		<SafeAreaView className="flex-1 items-center justify-center bg-secondary">
			<Container className="mt-4">
				<ScrollView showsVerticalScrollIndicator={false}>
					{recipes.map(({ title, description }) => (
						<Box key={title} border="1" borderRadius="md" className="bg-third mb-4">
							<VStack space="4" divider={<Divider />}>
								<Box className=" items-center px-4 pt-4">{title}</Box>
								<Box className=" items-center px-4 pb-4">{description}</Box>
							</VStack>
						</Box>
					))}
				</ScrollView>
				<Button size="lg" className="bg-primary mx-auto my-4 px-16" onPress={handlePress}>
					Pesquisar novamente
				</Button>
			</Container>
		</SafeAreaView>
	);
}
