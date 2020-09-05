import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";
import { CheckBox } from "react-native-elements";
import { change } from "redux-form";
import colors from "../../../constants/colors";

const App = ({
	formName,
	inputProps,
	input,
	label,
	options = [],
	radioButtons,
	completion = null,
	meta: { touched, error, warning },
}) => {
	const [checkedIndex, setCheckedIndex] = useState(false);
	const dispatch = useDispatch();

	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.container}>
				{options.map((button) => {
					let index = input.value === "" ? 0 : input.value;

					console.log("yyyyyyy--------");
					console.log(input.value);
					return (
						<CheckBox
							key={button.key}
							Component={TouchableWithoutFeedback}
							title={button.title}
							checked={index === button.key ? true : false}
							onPress={() => {
								console.log(input.name);
								if (button.key != index) {
									dispatch(change(formName, input.name, button.key));
									setCheckedIndex(button.key);
								} else {
									dispatch(change(formName, input.name, 0));
									setCheckedIndex(0);
								}
							}}
						/>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	formControl: {
		marginTop: 10,
	},

	label: {
		marginBottom: 15,
		fontSize: 16,
		fontFamily: "open-sans-bold",
		color: colors.primary,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	checkboxContainer: {
		flex: 1,
		height: 100,

		flexDirection: "row",
		marginBottom: 20,
	},
	checkbox: {
		height: 40,
		width: 40,
		alignSelf: "center",
		backgroundColor: "#000099",
	},
});

export default App;
