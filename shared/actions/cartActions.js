import api from "../api/heroku.js";
import CartItem from "../models/CartItem";
import Prestation from "../models/prestation";
export const ADD_TO_CARD = "ADD_TO_CARD";
export const DELETE_FROM_CARD = "DELETE_FROM_CARD";
export const CART_ERROR = "CART_ERROR";
export const CART_LOADING = "CART_LOADING";
export const CART_FETCH = "CART_READ";

export const clearErrorCart = () => async (dispatch) => {
	dispatch({ type: CART_ERROR, payload: null });
};
export const listCartItem = (user) => async (dispatch) => {
	try {
		const { data } = await api.get(`/shopping_carts/${user.cart.id}`, {
			secure: true,
		});
		var items = data.items.reduce(function (map, obj) {
			const prestation = new Prestation(
				obj.prestation.id,
				obj.prestation.company,
				obj.prestation.name,
				"",
				"",
				obj.prestation.price
			);
			map[obj.prestation.id] = new CartItem(
				obj.id,
				obj.quantity,
				obj.totalAmount,
				prestation,
				obj.checkOutSessionID ?? null
			);
			return map;
		}, {});
		console.log(data);

		console.log(items);
		// Object.entries(items)
		// 	.map(([id, presta]) => {
		// 		console.log(id, presta.cartItemId);

		// 		return {
		// 			id,
		// 			cartItemId: presta.cartItemId,
		// 			title: presta.title,
		// 			price: presta.price,
		// 			quantity: presta.quantity,
		// 			totalAmount: presta.totalAmount,
		// 		};
		// 	})
		dispatch({
			type: CART_FETCH,
			payload: { items, totalAmount: data.totalAmount },
		});
	} catch (e) {
		console.log(e.message);
		dispatch({ type: CART_ERROR, payload: errorFunc(e) });
	}
};
export const updateCartItem = (oldCartItem, prestation) => async (dispatch) => {
	try {
		const { data } = await api.put(
			`/shopping_cart_items/${oldCartItem.cartItemId}`,
			{
				prestation: `/api/prestations/${prestation.id}`,
			},
			{ secure: true }
		);

		const cartItem = new CartItem(
			data.id,
			data.quantity,
			data.totalAmount,
			prestation
		);

		const totalAmount = data.cart.totalAmount;
		const test = { prestation, cartItem, totalAmount };
		console.log(test);

		dispatch({
			type: ADD_TO_CARD,
			payload: { prestation, cartItem, totalAmount },
		});
	} catch (e) {
		console.log(e.response);
		dispatch({ type: CART_ERROR, payload: errorFunc(e) });
	}
};
export const addToCart = (prestation) => async (dispatch) => {
	try {
		const { data } = await api.post(
			"/shopping_cart_items",
			{
				prestation: `/api/prestations/${prestation.id}`,
				startTime: "2019-09-17T22:13:19+00:00",
				endTime: "2019-09-17T22:13:19+00:00",
			},
			{ secure: true }
		);

		const cartItem = new CartItem(
			data.id,
			data.quantity,
			data.totalAmount,
			prestation
		);
		const totalAmount = data.cart.totalAmount;
		dispatch({
			type: ADD_TO_CARD,
			payload: { prestation, cartItem, totalAmount },
		});
	} catch (e) {
		console.log(e);

		dispatch({ type: CART_ERROR, payload: errorFunc(e) });
	}
};

export const deleteFromCard = (id, prestationId) => async (dispatch) => {
	try {
		const { data } = await api.delete(`/shopping_cart_items/${id}`, {
			secure: true,
		});
		console.log("secces delete item cart", id);
		console.log("total :", data.totalAmount);

		dispatch({
			type: DELETE_FROM_CARD,
			payload: { id: prestationId, totalAmount: data.totalAmount },
		});
	} catch (e) {
		console.log(e);

		dispatch({ type: CART_ERROR, payload: errorFunc(e) });
	}
};

const errorFunc = (e) => {
	if (!e.response)
		return `Internal Error Sorry!!: \n ${e.toString().substr(0, 50)}}`;
	console.log("Auth Error errrrrr");
	console.log(e.response.data);

	return (
		e.response.data["hydra:description"] ||
		e.response.data.detail ||
		`Something Went Wrong: ${e.response.data.message}`
	);
};
