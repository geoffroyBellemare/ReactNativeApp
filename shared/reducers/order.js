import { CREATE_PAYMENT_INTENT } from "../actions/types";

const initialStates = {
	error: null,
	paymentMethodId: null,
	client_secret: null,
	loading: false,
	orders: [],
};

export default (state = initialStates, action) => {
	switch (action.type) {
		case CREATE_PAYMENT_INTENT:
			return {
				paymentMethodId: action.payload.paymentMethodId,
				client_secret: action.payload.client_secret,
				orders: [...state.orders, action.payload.order],
			};
		default:
			return state;
	}
};
