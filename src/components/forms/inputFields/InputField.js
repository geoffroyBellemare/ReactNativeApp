import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import colors from "../../../constants/colors";

const InputField = ({
	inputProps,
	input,
	label,
	meta: { touched, error, warning },
}) => {
	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={{
					...styles.input,
					color: touched && error ? "red" : "#888",
					borderBottomColor: touched && error ? "red" : "#ccc",
				}}
				onChangeText={input.onChange}
				{...input}
				{...inputProps}
				value={input.value.toString()}
			/>
			{touched && error && <Text style={styles.error}>{error}</Text>}
			{warning && <Text style={styles.warning}>{warning}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	formControl: {
		marginTop: 10,
		width: "100%",
	},
	label: {
		fontSize: 16,
		fontFamily: "open-sans-bold",
		color: colors.primary,
	},
	error: {
		fontFamily: "open-sans",
		fontSize: 15,
		color: "red",
	},
	input: {
		marginTop: 5,
		marginHorizontal: 20,
		paddingVertical: 5,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		fontSize: 20,
		fontFamily: "open-sans",
		marginHorizontal: 2,
	},
});
export default InputField;
