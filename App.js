import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EAE5D1',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: '#5F1F15'
	}
});

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}
