import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./shared/store";

import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import ShopNavigator from "./src/navigator/ShopNavigator";
import { setNavigator } from "./navigationRef";
import { ThemeProvider } from "react-native-elements";
import colors from "./src/constants/colors.js";
import { decode, encode } from "base-64";

if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

// Prevent native splash screen from autohiding before App component declaration
// it's good to explicitly catch and inspect any error
const theme = {
	colors: {
		primary: colors.primary,
		secondary: colors.accent,
	},
};
export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);
	const fetchFonts = async () => {
		await Font.loadAsync({
			"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
			"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
		});
		setFontLoaded(true);
	};

	useEffect(() => {
		fetchFonts();
	}, []);

	if (!fontLoaded) return null;
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<ShopNavigator ref={(navigator) => setNavigator(navigator)} />
			</ThemeProvider>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		fontFamily: "open-sans-bold",
		fontSize: 40,
		textAlign: "center",
		margin: 10,
	},
	instruction: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5,
	},
	token: {
		height: 20,
	},
});
