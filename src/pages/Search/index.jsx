import React, { useEffect, useMemo, useState } from 'react';
import { CHAT_GPD_API_KEY, GCP_SPEECH_TO_TEXT_KEY } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Container, Text, TextArea, Alert, Spinner, Hidden, useToast } from 'native-base';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { MotiPressable } from 'moti/interactions';

const RECORDING_OPTIONS = {
	ios: {
		extension: '.wav',
		audioQuality: Audio.IOSAudioQuality.HIGH,
		sampleRate: 44100,
		numberOfChannels: 1,
		bitRate: 128000,
		linearPCMBitDepth: 16,
		linearPCMIsBigEndian: false,
		linearPCMIsFloat: false
	},
	android: {
		extension: '.m4a',
		outputFormat: Audio.AndroidOutputFormat.DEFAULT,
		audioEncoder: Audio.AndroidAudioEncoder.DEFAULT
	},
	web: {}
};

export default function Search() {
	const nav = useNavigation();
	const toast = useToast();

	const [isLoading, setIsLoading] = useState(false);
	const [recipes, setRecipes] = useState(null);
	const [description, setDescription] = useState('');
	const [recording, setRecording] = useState(null);
	const [isConvertingSpeechToText, setIsConvertingSpeechToText] = useState(false);

	async function handleRecordingStart() {
		const { granted } = await Audio.getPermissionsAsync();

		if (granted) {
			try {
				const { recording } = await Audio.Recording.createAsync(RECORDING_OPTIONS);
				setRecording(recording);
			} catch (error) {
				console.log(error);
			}
		}
	}

	async function handleRecordingStop() {
		try {
			await recording?.stopAndUnloadAsync();
			const recordingFileUri = recording?.getURI();

			if (recordingFileUri) {
				const base64File = await FileSystem.readAsStringAsync(recordingFileUri, {
					encoding: FileSystem?.EncodingType?.Base64
				});
				await FileSystem.deleteAsync(recordingFileUri);

				setRecording(null);
				getTranscription(base64File);
			} else {
				Alert.alert('Audio', 'Não foi possível obter a gravação.');
			}
		} catch (error) {
			console.log(error);
		}
	}

	function getTranscription(base64File) {
		setIsConvertingSpeechToText(true);

		fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${GCP_SPEECH_TO_TEXT_KEY}`, {
			method: 'POST',
			body: JSON.stringify({
				config: {
					languageCode: 'pt-BR',
					encoding: 'WEBM_OPUS',
					sampleRateHertz: 24000
				},
				audio: {
					content: base64File
				}
			})
		})
			.then(response => response.json())
			.then(data => {
				setDescription(data.results[0].alternatives[0].transcript);
			})
			.catch(() =>
				toast.show({
					description: 'Error ao transcrever o audio.',
					fontWeight: 'bold',
					placement: 'top',
					bgColor: 'red.700',
					isClosable: true
				})
			)
			.finally(() => setIsConvertingSpeechToText(false));
	}

	function handleFetchTags() {
		setIsLoading(true);
		const prompt = `Generate a list with ten recipes in Portuguese with the following ingredients ${description.trim()}.
        Return each separated by json, with title and short description`;

		fetch('https://api.openai.com/v1/engines/text-davinci-003-playground/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${CHAT_GPD_API_KEY}`
			},
			body: JSON.stringify({
				prompt,
				temperature: 0.22,
				max_tokens: 4000,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0
			})
		})
			.then(response => response.json())
			.then(data => setRecipes(data.choices[0].text))
			.catch(() =>
				toast.show({
					description: 'Erro ao conectar com o CHAT GPT.',
					fontWeight: 'bold',
					placement: 'top',
					bgColor: 'red.700',
					isClosable: true
				})
			)
			.finally(() => setIsLoading(false));
	}

	if (recipes !== null) {
		try {
			const recipeJSON = JSON.parse(recipes);
			nav.navigate('Results', { recipeJSON });
		} catch (error) {
			() =>
				toast.show({
					description: 'Erro ao listar resultados da busca.',
					fontWeight: 'bold',
					placement: 'top',
					bgColor: 'red.700',
					isClosable: true
				});
		}
	}

	useEffect(() => {
		Audio.requestPermissionsAsync().then(granted => {
			if (granted) {
				Audio.setAudioModeAsync({
					allowsRecordingIOS: true,
					interruptionModeIOS: InterruptionModeIOS.DoNotMix,
					playsInSilentModeIOS: true,
					shouldDuckAndroid: true,
					interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
					playThroughEarpieceAndroid: true
				});
			}
		});
	}, []);

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
					w="full"
					maxW="320"
					h={32}
					placeholder="Informe o ingrediente desejado!"
					onChangeText={setDescription}
					value={description}
					onClear={() => setDescription('')}
					editable={!isLoading || !isConvertingSpeechToText}
				/>
				<Button
					size="lg"
					className="bg-primary mx-auto mt-6 mb-12 px-16"
					onPress={handleFetchTags}
					disabled={isConvertingSpeechToText || !description || description === ''}
					isLoading={isLoading}
				>
					Pesquisar
				</Button>

				{isConvertingSpeechToText && <Spinner size="lg" color="#5F1F15" />}

				{isConvertingSpeechToText ? (
					<Hidden>
						<MotiPressable
							className="bg-primary p-10"
							onPressIn={handleRecordingStart}
							onPressOut={handleRecordingStop}
							disabled={isConvertingSpeechToText || isLoading}
							animate={useMemo(
								() =>
									({ pressed }) => {
										'worklet';

										return {
											scale: pressed ? 1.2 : 1
										};
									},
								[]
							)}
						>
							<FontAwesome name="microphone" size={72} color="#5F1F15" />
						</MotiPressable>
					</Hidden>
				) : (
					<MotiPressable
						className="bg-primary p-10"
						onPressIn={handleRecordingStart}
						onPressOut={handleRecordingStop}
						disabled={isConvertingSpeechToText || isLoading}
						animate={useMemo(
							() =>
								({ pressed }) => {
									'worklet';

									return {
										scale: pressed ? 1.2 : 1
									};
								},
							[]
						)}
					>
						<FontAwesome name="microphone" size={72} color="#5F1F15" />
					</MotiPressable>
				)}
			</Container>
		</SafeAreaView>
	);
}
