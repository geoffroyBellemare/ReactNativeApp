export const DELETE_USER_PRESTATION = "DELETE_USER_PRESTATION";
export const INIT_FORM_PRESTATION_BY_ID = "INIT_FORM_PRESTATION_BY_ID";
export const CREATE_PRESTATION = "CREATE_PRESTATION";
export const UPDATE_PRESTATION = "UPDATE_PRESTATION";
export const FETCH_PRESTATIONS = "FETCH_PRESTATIONS";
export const ERROR_PRESTATION = "ERROR_PRESTATION";
export const LOADING_PRESTATION = "LOADING_PRESTATION";
export const CLEAR_LOADING = "CLEAR_LOADING";
export const CLEAR_FORM = "CLEAR_FORM";
export const CLEAR_ERROR = "CLEAR_ERROR";

import api from "../api/heroku.js";
import { updateSyncErrors } from "redux-form";
import { navigate, goBack } from "../../navigationRef";

export const clearLoading = (bool) => (dispatch) => {
	dispatch({ type: LOADING_PRESTATION, payload: false });
};
export const clearError = () => (dispatch) => {
	dispatch({ type: CLEAR_ERROR });
	dispatch(
		updateSyncErrors("prestation", {
			title: "",
			imageUrl: "",
			description: "",
			price: "",
			quantity: "",
		})
	);
};
export const clearForm = () => (dispatch) => {
	dispatch({ type: CLEAR_FORM });
};
export const fetchPrestations = () => async (dispatch) => {
	try {
		const res = await api.get("/prestations", {
			secure: false,
		});
		console.log(res.data["hydra:member"]);
		dispatch({ type: FETCH_PRESTATIONS, payload: res.data["hydra:member"] });
	} catch (e) {
		console.log(e.response.data);
		dispatch({
			type: ERROR_PRESTATION,
			payload: e.response.data["hydra:description"] || e.response.data.detail,
		});
	}
};
export const createPrestation = ({
	title,
	description,
	price,
	quantity,
	imageUrl,
}) => async (dispatch) => {
	try {
		const res = await api.post("/prestations", {
			name: title,
			price: Number(price),
			quantity: 12,
			company: "/api/companies/1741",
		});

		console.log(res.data);

		dispatch({
			type: CREATE_PRESTATION,
			payload: {
				id: res.data.id,
				title,
				description,
				price,
				quantity,
				imageUrl,
			},
		});
		goBack();
	} catch (e) {
		//console.log(e.response);
		console.log(e.response.data);
		dispatch({
			type: ERROR_PRESTATION,
			payload: e.response.data["hydra:description"] || e.response.data.detail,
		});
		syncErrorsFunc(dispatch);
	}
};
export const updatePrestation = ({
	id,
	title,
	description,
	quantity,
	imageUrl,
}) => async (dispatch) => {
	dispatch({ type: LOADING_PRESTATION, payload: true });

	try {
		const res = await api.put(`/prestations/${id}`, {
			name: title,
			quantity: 12,
		});
		dispatch({ type: LOADING_PRESTATION, payload: false });
		dispatch({
			type: UPDATE_PRESTATION,
			payload: {
				id,
				title,
				description,
				quantity,
				imageUrl,
			},
		});
		goBack();
	} catch (e) {
		dispatch({ type: LOADING_PRESTATION, payload: false });
		dispatch({
			type: ERROR_PRESTATION,
			payload: e.response.data["hydra:description"] || e.response.data.detail,
		});
		syncErrorsFunc(dispatch);
	}
};

export const deleteUserPrestation = (id) => async (dispatch) => {
	try {
		await api.delete(`/prestations/${id}`);
		dispatch({ type: DELETE_USER_PRESTATION, payload: id });
	} catch (e) {
		console.log(e.response);
		dispatch({
			type: ERROR_PRESTATION,
			payload: e.response.data["hydra:description"] || e.response.data.detail,
		});
	}
};

export const initFormPrestationById = (id) => async (dispatch) => {
	dispatch({ type: INIT_FORM_PRESTATION_BY_ID, payload: id });
};
const syncErrorsFunc = (dispatch) => {
	dispatch(
		updateSyncErrors("prestation", {
			title: " ",
			imageUrl: " ",
			description: " ",
			price: " ",
			quantity: " ",
		})
	);
};
