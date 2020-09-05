import {
	DELETE_USER_PRESTATION,
	INIT_FORM_PRESTATION_BY_ID,
	CLEAR_FORM,
	CREATE_PRESTATION,
	UPDATE_PRESTATION,
	ERROR_PRESTATION,
	CLEAR_ERROR,
	FETCH_PRESTATIONS,
	LOADING_PRESTATION,
} from "../actions/prestationAction";
import Prestation from "../models/prestation";
const initialstates = {
	availablePrestations: [],
	userPrestations: [],
	// PRESTATIONS.filter(
	// 	(prestation) => prestation.companyId === "u1"
	// ),
	companyPrestations: [],
	// PRESTATIONS.filter(
	// 	(prestation) => prestation.companyId === "u1"
	// ),
	initialValues: {},
	error: null,
	loading: false,
};

export default (state = initialstates, action) => {
	switch (action.type) {
		case LOADING_PRESTATION:
			return {
				...state,
				loading: action.payload || false,
			};
		case FETCH_PRESTATIONS:
			const filterFunc = (p) => p.company.id === 1741;
			const mapFunc = (p) =>
				new Prestation(
					p.id.toString(),
					p.company.id,
					p.name,
					"https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg",
					"Random description",
					p.price,
					p.quantity
				);
			return {
				...state,
				error: null,
				availablePrestations: action.payload.map(mapFunc),
				userPrestations: action.payload.filter(filterFunc).map(mapFunc),
			};
		case CREATE_PRESTATION:
			const createdPrestation = new Prestation(
				action.payload.id.toString(),
				"u1",
				action.payload.title,
				action.payload.imageUrl,
				action.payload.description,
				Number(action.payload.price),
				action.payload.quantity
			);

			return {
				...state,
				error: null,
				availablePrestations: [
					...state.availablePrestations,
					createdPrestation,
				],

				userPrestations: [...state.userPrestations, createdPrestation],
			};

		case UPDATE_PRESTATION:
			const payload = action.payload;

			const indexUserP = state.userPrestations.findIndex(
				(p) => p.id === action.payload.id
			);
			const indexAvailableP = state.availablePrestations.findIndex(
				(p) => p.id === action.payload.id
			);

			const oldPrestation = state.userPrestations[indexUserP];
			const updatedPrestation = new Prestation(
				payload.id,
				oldPrestation.companyId,
				payload.title,
				payload.imageUrl,
				payload.description,
				oldPrestation.price,
				payload.quantity
			);

			const updatedUserPrestations = [...state.userPrestations];
			const updatedAvailablePrestations = [...state.availablePrestations];
			updatedUserPrestations[indexUserP] = updatedPrestation;
			updatedAvailablePrestations[indexAvailableP] = updatedPrestation;

			return {
				...state,
				error: null,
				availablePrestations: updatedAvailablePrestations,
				userPrestations: updatedUserPrestations,
			};
		case INIT_FORM_PRESTATION_BY_ID:
			return {
				...state,
				initialValues: state.availablePrestations.find(
					(p) => p.id === action.payload
				),
			};
		case ERROR_PRESTATION:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_FORM:
			return { ...state, initialValues: {} };
		case CLEAR_ERROR:
			return { ...state, error: null };
		case DELETE_USER_PRESTATION:
			return {
				...state,
				userPrestations: state.userPrestations.filter(
					({ id }) => id !== action.payload
				),
				availablePrestations: state.availablePrestations.filter(
					({ id }) => id !== action.payload
				),
			};
		default:
			return state;
	}
};
