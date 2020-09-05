import React from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	Button,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import * as authActions from "../../shared/actions/authAction.js";
import AuthForm from "../components/forms/AuthForm";
import Spacers from "../components/ui/Spacers";
import Loader from "../components/ui/Loader";

const USER_SIGNUP_FIELDS = [
	{
		formName: "authForm",
		type: "file",
		inputProps: {
			autoCorrect: false,
			autoCapitalize: "sentences",
			keyboardType: "default",
			placeholder: "No Image Selected Yet",
			returnKeyType: "next",
		},
		mimeType: "image/jpeg, image/png",
		label: "Image",
		name: "image_profile",
		value: null,
	},
	{
		label: "Username",
		name: "username",
		inputProps: {
			autoCorrect: false,
			autoCapitalize: "none",
			keyboardType: "default",
			placeholder: "Please enter yours here!!",
			returnKeyType: "next",
		},
	},
	{
		label: "Password",
		name: "password",
		inputProps: {
			autoCorrect: false,
			autoCapitalize: "none",
			keyboardType: "default",
			secureTextEntry: true,
			placeholder: "your pass ex Hello123#",
			returnKeyType: "next",
		},
	},
	{
		label: "Email",
		name: "email",
		inputProps: {
			autoCorrect: false,
			autoCapitalize: "none",
			keyboardType: "default",
			placeholder: "email adresse here!!",
			returnKeyType: "done",
		},
	},
];

const SignupScreen = ({ handleSubmit, navigation, signUp, clearErrMsg }) => {
	const { error, loading } = useSelector(({ auth }) => auth);
	const onClickLink = () => navigation.navigate("Signin");

	const onSubmit = handleSubmit((values) => {
		//console.log(values);

		signUp(values, navigation.navigate);
	});
	if (loading) return <Loader />;

	return (
		<KeyboardAvoidingView
			behavior='padding'
			keyboardVerticalOffset={200}
			style={styles.root}>
			<ScrollView contentContainerStyle={styles.scroll}>
				<AuthForm
					fields={USER_SIGNUP_FIELDS}
					onSubmit={onSubmit}
					onClickLink={onClickLink}
					buttonTitle='Sign Up'
					linkText={"SignIn"}
					linkLabel={"Already have an account "}
					errorMessage={error}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	scroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 20,
	},
	form: {
		alignSelf: "stretch",
		marginHorizontal: 20,
		marginBottom: 100,
	},
});
SignupScreen.navigationOptions = (props) => {
	return {
		headerShown: false,
	};
};

function validate(values) {
	const errors = {};
	if (!values["username"] || values["username"].trim().length < 3) {
		errors.username = "you must provide info";
	}
	return errors;
}

export default connect(
	null,
	authActions
)(
	reduxForm({
		form: "authForm",
		validate,
		enableReinitialize: true,
		destroyOnUnmount: false,
	})(SignupScreen)
);
