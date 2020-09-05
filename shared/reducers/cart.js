import {
	ADD_TO_CARD,
	DELETE_FROM_CARD,
	CART_ERROR,
	CART_LOADING,
	CART_FETCH,
} from "../actions/cartActions";
import { DELETE_USER_PRESTATION } from "../actions/prestationAction";
import {
	ADD_ORDER,
	ERROR_ORDER,
	PURCHASE_ORDER,
} from "../actions/orderActions";
import CartItem from "../models/CartItem";
const initialState = {
	items: {},
	totalAmount: 0,
	error: "ggggggg",
	checkOutSessionID: null,
};
export default (state = initialState, action) => {
	let cartItem;
	switch (action.type) {
		case CART_FETCH:
			return {
				...action.payload,
				error: null,
			};
		case DELETE_FROM_CARD:
			const id = action.payload.id;
			cartItem = state.items[id];

			let updatedCartItems;

			if (cartItem.quantity > 1) {
				const updatedCartItem = new CartItem(
					cartItem.cartItemId,
					cartItem.quantity - 1,
					cartItem.totalAmount - cartItem.prestation.price,
					cartItem.prestation
				);
				console.log(updatedCartItem);

				updatedCartItems = { ...state.items, [id]: updatedCartItem };
			} else {
				updatedCartItems = { ...state.items };
				delete updatedCartItems[id];
			}
			return {
				totalAmount: action.payload.totalAmount,
				items: updatedCartItems,
			};
		case PURCHASE_ORDER:
			return {
				...state,
				checkOutSessionID: action.payload,
			};
		case ADD_TO_CARD:
			const addedPrestation = action.payload.prestation;
			console.log("reduver cart");
			console.log(addedPrestation);

			const price = addedPrestation.price;
			const title = addedPrestation.title;
			// if (state.items[addedPrestation.id]) {
			// 	oldCartItem = state.items[addedPrestation.id];

			// 	cartItem = new CartItem(
			// 		oldCartItem.price,
			// 		oldCartItem.quantity + 1,
			// 		oldCartItem.title,
			// 		oldCartItem.totalAmount + price
			// 	);
			// } else {
			// 	console.log("gggggggg");

			// 	//console.log(action.payload.cartItem);

			// 	//cartItem = new CartItem(12, price, 1, title, price);
			// 	cartItem = action.payload.cartItem;
			// }
			// return {
			// 	items: { ...state.items, [addedPrestation.id]: cartItem },
			// 	totalAmount: state.totalAmount + price,
			// };
			//console.log(action.payload.cartItem);
			cartItem = action.payload.cartItem;
			return {
				items: { ...state.items, [addedPrestation.id]: cartItem },
				totalAmount: action.payload.totalAmount,
			};
		// case ADD_ORDER:
		// 	return initialState;
		case DELETE_USER_PRESTATION:
			if (!state.items[action.payload]) {
				return state;
			}
			const items = { ...state.items };
			delete items[action.payload];

			deletedItem = state.items[action.payload];

			return {
				items,
				totalAmount: state.totalAmount - deletedItem.totalAmount,
			};
		case CART_ERROR:
		case ERROR_ORDER:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
