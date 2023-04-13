import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Box, Button, Container, Icon, IconButton, Text, TextArea, useToast, Alert } from 'native-base';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const CHAT_GPD_API_KEY = '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';
// const GCP_SPEECH_TO_TEXT_KEY = process.env.GCP_SPEECH_TO_TEXT_KEY;

const RECORDING_OPTIONS = {
	android: {
		extension: '.m4a',
		outputFormat: Audio.AndroidOutputFormat.MPEG_4,
		audioEncoder: Audio.AndroidAudioEncoder.AAC,
		sampleRate: 44100,
		numberOfChannels: 2,
		bitRate: 128000
	},
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
	web: {}
};

export default function Search() {
	const nav = useNavigation();

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

		fetch(`https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyAwYv-VEzFvXwcmRXC2GC663BopPrHBKFY`, {
			method: 'POST',
			body: JSON.stringify({
				config: {
					languageCode: 'pt-BR',
					encoding: 'LINEAR16',
					sampleRateHertz: 41000
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
			.catch(error => console.log(error))
			.finally(() => setIsConvertingSpeechToText(false));
	}

	function handleFetchTags() {
		setIsLoading(true);
		const prompt = `Generate a list with five recipes in Portuguese with the following ingredients ${description.trim()}.
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
				max_tokens: 500,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0
			})
		})
			.then(response => response.json())
			.then(data => setRecipes(data.choices[0].text))
			.catch(() => Alert.alert('Erro', 'Não foi possível buscar as receitas.'))
			.finally(() => setIsLoading(false));
	}

	if (recipes !== null) {
		const recipeJSON = JSON.parse(recipes);
		nav.navigate('Results', { recipeJSON });
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
				{/* {toastMessage &&
					toast.show({
						render: () => {
							return (
								<Box rounded="sm" className=" bg-primary px-2 py-1 mb-3">
									Toast Nice Feedback
								</Box>
							);
						}
					})} */}
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
					editable={!isLoading}
				/>
				<Button
					size="lg"
					className="bg-primary mx-auto my-4 px-16"
					// onPress={openResults}
					onPress={handleFetchTags}
					isLoading={isLoading}
				>
					Pesquisar
				</Button>

				<IconButton
					onPressIn={handleRecordingStart}
					onPressOut={handleRecordingStop}
					isLoading={isConvertingSpeechToText}
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
