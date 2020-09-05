import {
	CREATE_COMPANY,
	ERROR_CREATE_COMPANY,
	CLEAR_ERROR_CREATE_COMPANY,
	IS_LOADING,
	STEPPER_CREATE_COMPANY,
} from "./types.js";
import {
	stripeCompanyParams,
	stripePersonParams,
	stripeIndividualParams,
	stripeAddVerificationParams,
	stripeToken,
} from "../api/stripe";
import api from "../api/heroku.js";

export const createAccount = (values, status, step, cpy) => async (
	dispatch
) => {
	const {
		person = null,
		company = null,
		individual = null,
		external_account = null,
	} = values;

	const business_type = values.business_type === 1 ? "individual" : "company";
	let result;
	let tokens = {};
	let data = {};
	let params = {};
	let url = cpy ? `/company/${cpy.id}/tokens` : `/company/tokens`;
	let requestFn = cpy ? api.put : api.post;

	dispatch({ type: IS_LOADING, payload: true });

	try {
		if (!values.business_type) throw Error("No Business_type selected");

		switch (status) {
			case "individual":
				await stripeAddVerificationParams(individual);
				params = stripeIndividualParams(individual);
				data = await stripeToken("account", params);
				tokens.accountToken = data.id;
				break;
			case "company":
				await stripeAddVerificationParams(company);
				params = stripeCompanyParams(company);
				data = await stripeToken("account", params);
				tokens.accountToken = data.id;
				break;
			case "person":
				await stripeAddVerificationParams(person);
				params = stripePersonParams(person);
				data = await stripeToken("person", params);
				tokens.personToken = data.id;
				data = await stripeToken("account", {
					company: {
						//executives_provided: true,
						owners_provided: true,
						directors_provided: true,
					},
				});
				tokens.accountToken = data.id;
				break;
			case "external_account":
				data = await stripeToken("bank_account", external_account);
				tokens.externalAccountToken = data.id;
				break;
		}

		result = await requestFn(
			url,
			{ ...tokens, step, business_type, status },
			{ secure: true }
		);

		// console.log("creaate company :");
		// console.log(result.data.company);
		// console.log(result.data.account);

		dispatch({
			type: CREATE_COMPANY,
			payload: { data: result.data.company, step: 1 },
		});
		dispatch({ type: STEPPER_CREATE_COMPANY, payload: step });
	} catch (e) {
		dispatchError(dispatch, e);
	}
};

export const moveBy = (step) => async (dispatch) => {
	dispatch({ type: STEPPER_CREATE_COMPANY, payload: step });
};

export const companyClearErrMsg = () => async (dispatch) => {
	console.log("cleareeee--");
	dispatch({ type: CLEAR_ERROR_CREATE_COMPANY, payload: null });
};
const dispatchError = (dispatch, error) => {
	let message = "error";
	if (error.response) {
		if (error.response.data["hydra:description"]) {
			message = error.response.data["hydra:description"];
		} else if (error.response.data.message) {
			message = error.response.data.message;
		} else if (error.response.data.error) {
			message = error.response.data.error.message;
		}
	} else if (error.message) {
		message = error.message;
	}
	dispatch({
		type: ERROR_CREATE_COMPANY,
		payload: message,
	});
};
