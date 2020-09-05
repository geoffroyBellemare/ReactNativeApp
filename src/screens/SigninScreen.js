import React, { useEffect } from "react";
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

import * as companyActions from "../../shared/actions/companyAction";
import AuthForm from "../components/forms/AuthForm";
import Spacers from "../components/ui/Spacers";
import Loader from "../components/ui/Loader";
import dev from "../../shared/config/dev";

const USER_SIGNIN_FIELDS = [
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
			returnKeyType: "done",
		},
	},
];

const SigninScreen = ({
	handleSubmit,
	navigation,
	signIn,
	clearErrMsg,
	companyCreateToken,
}) => {
	const { error, loading } = useSelector(({ auth }) => auth);
	const onClickLink = () => navigation.navigate("Signup");
	const onSubmit = handleSubmit((values) => {
		//console.log(values);

		signIn(values, navigation.navigate);
	});
	if (loading) return <Loader />;
	return (
		<KeyboardAvoidingView
			behavior='padding'
			keyboardVerticalOffset={100}
			style={styles.root}>
			<ScrollView contentContainerStyle={styles.scroll}>
				<AuthForm
					fields={USER_SIGNIN_FIELDS}
					onSubmit={onSubmit}
					onClickLink={onClickLink}
					buttonTitle='Sign In'
					linkText={"SignUp"}
					linkLabel={"Don t have an account "}
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
SigninScreen.navigationOptions = (props) => {
	return {
		headerTitle: "Sign In",
	};
};
function validate(values) {
	const errors = {};
	if (!values["username"] || values["username"].trim().length < 3) {
		errors.title = "you must provide info";
	}
	return errors;
}
function mapStateToProps({ auth }) {
	return auth;
}
export default connect(mapStateToProps, { ...authActions, ...companyActions })(
	reduxForm({
		form: "authForm",
		validate,
		enableReinitialize: true,
		destroyOnUnmount: false,
	})(SigninScreen)
);
