import React from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	Platform,
	TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";

import { Field, reduxForm } from "redux-form";
import InputField from "./inputFields/InputField";
import ImageField from "./inputFields/ImageField";
import CheckBoxField from "./inputFields/CheckBoxField";
import Spacers from "../ui/Spacers";
import colors from "../../constants/colors";
const RaisedButton = (props) => <Button raised {...props} />;
const AuthForm = ({
	fields,
	onSubmit,
	onClickLink,
	buttonTitle,
	linkText,
	linkLabel,
	errorMessage,
}) => {
	return (
		<View style={styles.form}>
			{fields.map((field, index) => {
				let component;
				switch (field.name) {
					case "image_profile":
						component = ImageField;
						break;
					default:
						component = InputField;
						break;
				}
				return (
					<View key={index}>
						<Field {...field} component={component} />
						<Spacers />
					</View>
				);
			})}

			{errorMessage && (
				<Spacers>
					<Text style={styles.error}>{errorMessage}</Text>
				</Spacers>
			)}
			<Spacers />
			<Spacers>
				<Button
					style={styles.button}
					color={Platform.OS === "android" ? "white" : colors.primary}
					title={buttonTitle}
					onPress={onSubmit}
				/>
			</Spacers>

			<Spacers />
			<Spacers />
			<Spacers />
			<TouchableOpacity onPress={onClickLink}>
				<Text style={styles.linkLabel}>
					{linkLabel}
					<Text style={styles.linkText}> {linkText} !</Text>{" "}
				</Text>
			</TouchableOpacity>
			<Spacers />
		</View>
	);
};
const styles = StyleSheet.create({
	form: {
		alignSelf: "stretch",
		marginHorizontal: 10,
	},
	linkLabel: {
		marginVertical: 20,
		textAlign: "center",
		fontFamily: "open-sans",
		fontSize: 17,
		color: colors.primary,
	},
	linkText: {
		fontFamily: "open-sans",
		fontSize: 17,
		color: colors.accent,
	},
	error: {
		textAlign: "center",
		fontFamily: "open-sans",
		fontSize: 15,
		color: "red",
	},
});

export default reduxForm({
	form: "authForm",
	enableReinitialize: true,
	destroyOnUnmount: false,
})(AuthForm);
