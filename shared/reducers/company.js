import {
	CREATE_COMPANY,
	IS_LOADING,
	ERROR_CREATE_COMPANY,
	CLEAR_ERROR_CREATE_COMPANY,
	STEPPER_CREATE_COMPANY,
	REGISTERED_COMPANY,
} from "../actions/types";
import Company from "../models/Company";
import { COMPANY_FORM_PAGES } from "../fields/stripeFields.js";
import { COMPANY } from "../fields/stripeFields.js";
const pagesNumber = ["company", "person", "external_account"];

const initialStates = {
	loading: false,
	page: "company",
	step: 0,
	successSteps: [],
	currentStatus: "company",
	status: "company",
	company: null,
	error: null,
	business_type: 1,
	initialValues: {
		individual: {
			last_name: "geoff",
			first_name: "geoff",
			dob: "11/11/1981",
			email: "froy@l.fr",
			phone: "7651010887",
			address: {
				line1: "rue du robec",
				city: "rouen",
				state: "normandie",
				postal_code: "76000",
			},
		},
		business_type: 2,
		person: {
			last_name: "geoff",
			first_name: "geoff",
			dob: "11/11/1981",
			email: "froy@l.fr",
			phone: "7651010887",
			address: {
				line1: "rue du robec",
				city: "rouen",
				state: "normandie",
				postal_code: "76000",
			},
		},
		company: {
			name: "Cours",
			phone: "7761234552",
			address: {
				line1: "rue du robec ta mere la chagattte del morté",
				line2: "rez de chaussez",
				state: "normandie",
				city: "rouen",
				postal_code: "76000",
			},
			tax_id: "000000000",
		},
		external_account: {
			currency: "EUR",
			account_number: "FR1420041010050500013M02606",
			country: "FR",
		},
		business_profile: {
			mcc: "5555",
			url: "http//url",
		},
	},
};
export default (state = initialStates, action) => {
	switch (action.type) {
		case STEPPER_CREATE_COMPANY:
			let newStep = state.step;
			let status = state.status;
			if (action.payload > 0) {
				if (state.step < COMPANY_FORM_PAGES[status].pages.length - 1) {
					newStep = state.step + 1;
				} else if (state.step === COMPANY_FORM_PAGES[status].pages.length - 1) {
					if (pagesNumber[COMPANY_FORM_PAGES[status].index + 1]) {
						status = pagesNumber[COMPANY_FORM_PAGES[status].index + 1];
						newStep = 0;
					}
				}
			} else {
				if (state.step > 0) {
					newStep = state.step - 1;
				} else if (state.step === 0) {
					if (pagesNumber[COMPANY_FORM_PAGES[status].index - 1]) {
						status = pagesNumber[COMPANY_FORM_PAGES[status].index - 1];
						newStep = COMPANY_FORM_PAGES[status].pages.length - 1;
						if (
							COMPANY_FORM_PAGES[status].index <
							COMPANY_FORM_PAGES[state.currentStatus].index
						) {
							status = state.status;
							newStep = state.step;
						}
					}
				}
				//newStep = state.step >= 1 ? state.step - 1 : state.step;
			}
			return { ...state, step: newStep || 0, status };
		case CREATE_COMPANY:
			// if (action.payload.step > 0) {
			// 	newStep = state.step < 7 ? state.step + 1 : state.step;
			// } else {
			// 	newStep = state.step >= 1 ? state.step - 1 : state.step;
			// }

			//const step = newStep;

			const loading = false;
			const error = null;
			const { name, id, account_id } = action.payload.data;
			const company = new Company(id, name, account_id);
			return {
				...state,
				loading,
				error,
				company,
				currentStatus: action.payload.data.status,
				// successSteps: !state.successSteps.includes(state.step)
				// 	? [...state.successSteps, state.step]
				// 	: state.successSteps,
			};
		case REGISTERED_COMPANY:
			return {
				...state,
				step: /*action.payload.step*/ 0,
				status: action.payload.status,
				currentStatus: action.payload.status,
				business_type: action.payload.business_type === "individual" ? 1 : 2,
				loading: false,
				error: null,
				company: new Company(
					action.payload.id,
					action.payload.name,
					action.payload.account_id
				),
				initialValues: {
					...state.initialValues,
					business_type: action.payload.business_type === "individual" ? 1 : 2,
				},
			};
		case IS_LOADING:
			return { ...state, loading: action.payload };
		case ERROR_CREATE_COMPANY:
		case CLEAR_ERROR_CREATE_COMPANY:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};
