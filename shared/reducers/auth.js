import {
	SIGN_UP,
	ERROR_AUTH,
	CLEAR_ERROR,
	IS_LOADING,
	SIGN_IN,
} from "../actions/types";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Image from "../models/Image.js";
import Company from "../models/Company";

const initialStates = {
	error: null,
	token: null,
	user: null,
	loading: false,
	initialValues: {
		password: "Secret123#",
		username: "raoul1",
	},
};

export default (state = initialStates, action) => {
	const data = action.payload;
	switch (action.type) {
		case SIGN_IN:
			const user = new User(
				data.id,
				data.username,
				data.email || null,
				null,
				data.imageProfile
					? new Image(data.imageProfile.id, data.imageProfile.url)
					: null,
				data.shoppingCart ? new Cart(data.shoppingCart.id) : null,
				data.company
					? new Company(
							data.company.id,
							data.company.name,
							data.company.account_id
					  )
					: null
			);
			console.log(user);
			return {
				...state,
				token: data.token,
				user: user,
				error: null,
				loading: false,
			};
		case SIGN_UP:
			//const data = action.payload;
			return {
				...state,
				user: new User(
					data.id,
					data.username,
					data.email,
					null,
					new Image(data.imageProfile.id, data.imageProfile.url),
					new Cart(data.shoppingCart.id)
				),
				error: null,
				loading: false,
			};
		case ERROR_AUTH:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case IS_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};
