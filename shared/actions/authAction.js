import api from "../api/heroku.js";
import stripe from "../api/stripe.js";
import axios from "axios";
import * as awsS3 from "../services/awsServices";
import { updateSyncErrors } from "redux-form";
import {
	SIGN_IN,
	ERROR_AUTH,
	CLEAR_ERROR,
	SIGN_UP,
	IS_LOADING,
	REGISTERED_COMPANY,
} from "./types.js";
import { urlRelativePath } from "../utils/stringUtils.js";
import { appendParams, getSearchParams } from "../utils/paramsUtils.js";
import AsyncStorage from "@react-native-community/async-storage";
export const signUp = (
	{ image_profile, username, email, password },
	navigate
) => async (dispatch) => {
	if (!image_profile) {
		dispatch({ type: ERROR_AUTH, payload: "Please provide a profile image" });
		return;
	}
	const values = {
		username,
		name: username,
		password,
		retypePassword: password,
		email,
	};
	dispatch({ type: IS_LOADING, payload: true });

	try {
		const { data } = await api.post("/users", values, { secure: false });
		await awsS3.upload(image_profile, urlRelativePath(data.imageProfile.url));
		dispatch({ type: SIGN_UP, payload: data });
		navigate("Signin");
	} catch (e) {
		if (e.response) {
			dispatchError(dispatch, e.response.data["hydra:description"]);
		} else if (e.message) {
			dispatch({ type: ERROR_AUTH, payload: `Upload: ${e.message}` });
		} else {
			dispatch({ type: ERROR_AUTH, payload: `unKnown Error` });
		}

		return;
	}
};

export const signIn = ({ username, email, password }, navigate) => async (
	dispatch
) => {
	dispatch({ type: IS_LOADING, payload: true });
	try {
		const {
			data: { token, id },
		} = await api.post(
			"/login_check",
			{
				email,
				password,
				username,
			},
			{ secure: false }
		);
		//Secret123#
		dispatch({ type: IS_LOADING, payload: false });
		dispatch({
			type: SIGN_IN,
			payload: { token, id, email, password, username },
		});
		navigate("Resolve");
	} catch (e) {
		if (e.response) {
			dispatchError(dispatch, e.response.data.message);
		} else if (e.message) {
			dispatch({ type: ERROR_AUTH, payload: `Upload: ${e.message}` });
		} else {
			dispatch({ type: ERROR_AUTH, payload: `unKnown Error` });
		}
		//admin
		//secret123#
	}
};
export const clearErrMsg = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERROR });
};

export const tryLocalSignin = (navigate) => async (dispatch) => {
	const token = await AsyncStorage.getItem("token");
	let id = parseInt(await AsyncStorage.getItem("userId"));

	if (token) {
		try {
			const { data } = await api.get(`/users/${id}`, {
				secure: true,
			});
			console.log("----------???data");
			console.log(data.company);
			navigate("main");
			if (data.company) {
				dispatch({ type: REGISTERED_COMPANY, payload: data.company });
			}

			dispatch({ type: SIGN_IN, payload: { ...data, id, token } });
			dispatch({ type: IS_LOADING, payload: false });
			console.log("tryLocalSignin, succes ");
		} catch (e) {
			dispatchError(dispatch, e.message);
			navigate("Signin");
		}
	} else {
		navigate("Signin");
	}
};

const dispatchError = (dispatch, error) => {
	dispatch({
		type: ERROR_AUTH,
		payload: error,
	});
	dispatch(
		updateSyncErrors("authForm", {
			email: error,
			password: error,
			username: error,
		})
	);
};
