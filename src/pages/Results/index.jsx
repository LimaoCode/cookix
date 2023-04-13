import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Container, Button, ScrollView, VStack, Box, Divider, Text } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Results() {
	const route = useRoute();

	const recipes = route.params.recipeJSON;

	console.log('dentro dos resultados ->', recipes);

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
			</Container>
		</SafeAreaView>
	);
}
