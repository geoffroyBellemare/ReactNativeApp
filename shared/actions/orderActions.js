import api from "../api/heroku.js";
import { CREATE_PAYMENT_INTENT } from "./types.js";
import Order from "../models/Order";
import CartItem from "../models/CartItem";
import Prestation from "../models/prestation";
export const ADD_ORDER = "ADD_ORDER";
export const CREATE_ORDER = "CREATE_ORDER";
export const ERROR_ORDER = "ERROR_ORDER";
export const PURCHASE_ORDER = "PURCHASE_ORDER";
export const FETCH_ORDERS = "FETCH_ORDERS";
export const STRIPE = {
	PUBLIC_KEY: "",
	PLAN_NAME: "",
	SUCCESS_URL: "https://example.com/success",
	CANCELED_URL: "https://example.com/cancel",
};

export const successCheckoutOrder = () => async (dispatch) => {
	alert("succes checkout fill");
	dispatch({ type: PURCHASE_ORDER, payload: null });
};
export const cancelCheckoutOrder = () => async (dispatch) => {
	alert("somthing went wrong");
	dispatch({ type: PURCHASE_ORDER, payload: null });
};

export const stripeCheckoutRedirectHTML = (sessionId) => {
	if (!sessionId) {
		throw new Error("Invalid userID");
	}

	return `
	<html>
	  <body>
		<!-- Load Stripe.js on your website. -->
		<script src="https://js.stripe.com/v3"></script>
		<h1>Loading...</h1>
		<div id="error-message"></div>
		<script>
		  (function () {
			var stripe = Stripe('pk_test_N4ewHY6GPgws8Xxt3qpylRqc00hnmmHFJl');
			window.onload = function () {
			  // When the customer clicks on the button, redirect
			  // them to Checkout.
			  alert('${sessionId}');
			  stripe.redirectToCheckout({
				sessionId: '${sessionId}',
				// Do not rely on the redirect to the successUrl for fulfilling
				// purchases, customers may not always reach the success_url after
				// a successful payment.
				// Instead use one of the strategies described in
				// https://stripe.com/docs/payments/checkout/fulfillment
				// successUrl: 'https://7c547ed4.ngrok.io/',
				// cancelUrl: 'https://7c547ed4.ngrok.io/',
				
			  })
				.then(function (result) {
					alert('hhhh')
				  if (result.error) {
					// If redirectToCheckout fails due to a browser or network
					// error, display the localized error message to your customer.
					var displayError = document.getElementById('error-message');
					displayError.textContent = result.error.message;
					alert(result.error.message)
				  }
				}).catch(function(e) {
					console.log(e.message); // "Oh oh!"
				  });;
			};
		  })();
		</script>
	  </body>
	</html>
	`;
};

export const addOrder = (paymentMethodId /*cartItems, totalAmount*/) => async (
	dispatch
) => {
	//admin
	//secret123#

	try {
		const { data } = await api.post("/commands", {}, { secure: true });

		const client_secret = data.clientSecret;
		const items = data.commandItems.map(
			({ id, quantity, totalAmount, prestation }) =>
				new CartItem(
					id,
					quantity,
					totalAmount,
					new Prestation(
						prestation.id,
						prestation.company.id,
						prestation.name,
						"",
						"",
						prestation.price
					)
				)
		);
		const order = new Order(
			data.id,
			items,
			data.totalAmount,
			new Date(data.created)
		);

		//dispatch({ type: PURCHASE_ORDER, payload: data.checkOutSessionID });
		// dispatch({
		// 	type: ADD_ORDER,
		// 	payload: new Order(
		// 		data.id,
		// 		items,
		// 		data.totalAmount,
		// 		new Date(data.created)
		// 	),
		// });
		console.log(items);
		console.log(order);
		console.log(client_secret);
		dispatch({
			type: CREATE_PAYMENT_INTENT,
			payload: { client_secret, paymentMethodId, order },
		});
	} catch (e) {
		console.log(e.message);
		console.log(e.response.data);

		dispatch(errorFunc(e));
	}
};

export const listUserOrders = (user) => async (dispatch) => {
	try {
		const { data } = await api.get("/commands/", {
			secure: true,
			params: {
				customer: user.id,
			},
		});
		//console.log(data["hydra:member"]);
		dispatch({ type: FETCH_ORDERS, payload: data["hydra:member"] });
	} catch (e) {
		dispatch(errorFunc(e));
	}
};

const errorFunc = (e) => {
	let error_message;
	if (!e.response) {
		error_message = `Internal Error Sorry!!: \n ${e.toString().substr(0, 50)}}`;
	} else {
		error_message =
			e.response.data["hydra:description"] ||
			e.response.data.detail ||
			`Something Went Wrong: ${e.response.data.message}`;
	}
	return { type: ERROR_ORDER, payload: error_message };
};

export const createPaymentIntent = (paymentMethodId) => async (dispatch) => {
	alert("yyyyyy");
	try {
		const {
			data: { client_secret },
		} = await api.post("/command/paymentIntentTest", { test: "rien" });

		dispatch({
			type: CREATE_PAYMENT_INTENT,
			payload: { client_secret, paymentMethodId },
		});
	} catch (error) {
		console.log(error.response);
		return;
	}
};
