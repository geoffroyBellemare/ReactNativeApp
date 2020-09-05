import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import {
	Text,
	FlatList,
	ScrollView,
	StyleSheet,
	View,
	Alert,
} from "react-native";
import CartItem from "../components/shop/CartItem";
import colors from "../constants/colors";
import Loader from "../components/ui/Loader";
import * as cartActions from "../../shared/actions/cartActions";
import * as orderActions from "../../shared/actions/orderActions";
import Card from "../components/ui/Card";
import stripe from "tipsi-stripe";
import Button from "../components/Button";
import Spacers from "../components/ui/Spacers";
// import PurchasePrestation from "../components/shop/PurchasePrestation";

const CartScreen = ({
	navigation,
	listCartItem,
	addOrder,
	successCheckoutOrder,
	cancelCheckoutOrder,
}) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { client_secret, paymentMethodId } = useSelector(({ order }) => order);
	const [paymentMethod, setPaymentMethod] = useState(null);
	//admin
	//secret123#
	const user = useSelector(({ auth }) => {
		return auth.user;
	});
	const checkOutSessionID = useSelector(
		({ cart: { checkOutSessionID = null } }) => checkOutSessionID
	);
	const { totalAmount, error } = useSelector(
		({ cart: { totalAmount, error } }) => ({
			totalAmount,
			error,
		})
	);

	const cartItems = useSelector(({ cart: { items } }) =>
		Object.entries(items)
			.map(([id, presta]) => {
				console.log(id, presta.cartItemId);

				return {
					id,
					cartItemId: presta.cartItemId,
					title: presta.prestation.title,
					price: presta.price,
					quantity: presta.quantity,
					totalAmount: presta.totalAmount,
				};
			})
			.sort((a, b) => a && b && a.id > b.id)
	);

	useEffect(() => {
		stripe.setOptions({
			publishableKey: "pk_test_N4ewHY6GPgws8Xxt3qpylRqc00hnmmHFJl",
		});
		const listener = navigation.addListener("didFocus", fetchList);
		return () => {
			listener.remove();
		};
	}, []);

	useEffect(() => {
		if (!client_secret || !paymentMethodId) return;
		handleConfirmation();
	}, [handleConfirmation, client_secret, paymentMethodId]);

	const fetchList = useCallback(async () => {
		alert("charge la liste:   user ->" + user.id);
		if (user) {
			listCartItem(user);
		}
	}, [totalAmount, user]);

	const handleConfirmation = useCallback(async () => {
		alert("proceed confirm");
		try {
			const res = await stripe.confirmPaymentIntent({
				clientSecret: client_secret,
				paymentMethodId: paymentMethodId,
			});
			console.log(res);
		} catch (error) {
			console.log(error.message);
		}
	}, [client_secret, paymentMethodId]);

	handlePayment = () => {
		dispatch(orderActions.addOrder(paymentMethod.id));
	};
	handleCardPayPress = async () => {
		try {
			setPaymentMethod(null);
			setLoading(true);
			const options = {
				// Only iOS support this options
				smsAutofillDisabled: true,
				requiredBillingAddressFields: "full",
				prefilledInformation: {
					billingAddress: {
						name: "Gunilla Haugeh",
						line1: "Canary Place",
						line2: "3",
						city: "Macon",
						state: "Georgia",
						country: "US",
						postalCode: "31217",
						email: "ghaugeh0@printfriendly.com",
					},
				},
			};
			const payment_method = await stripe.paymentRequestWithCardForm(options);
			setPaymentMethod(payment_method);
			setLoading(false);
		} catch (error) {
			alert(error.message);
			setLoading(false);
		}
	};
	return (
		<View style={styles.root}>
			<Card style={styles.summary}>
				<Text style={styles.textAmount}>
					Total:{" "}
					<Text style={styles.amount}>
						{" "}
						${Math.round(totalAmount.toFixed(2) * 100) / 100}
					</Text>
				</Text>
			</Card>
			<Loader />

			<FlatList
				style={styles.scroll}
				data={cartItems}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<CartItem
						{...item}
						onDelete={() =>
							dispatch(cartActions.deleteFromCard(item.cartItemId, item.id))
						}
					/>
				)}
			/>
			<Spacers />
			{paymentMethod ? (
				<Button text='Buy' loading={loading} onPress={handlePayment} />
			) : (
				<Button
					color={colors.accent}
					text='Enter you card and pay'
					loading={loading}
					disabledText='select product'
					disabled={!cartItems.length ? true : false}
					onPress={handleCardPayPress}
				/>
			)}
			<Spacers />
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		marginTop: 20,
		flex: 1,
	},
	scroll: {
		height: "100%",
		//backgroundColor: "orange",
		// justifyContent: "center",
		// alignItems: "center",
		// marginHorizontal: 20,
	},
	button: {
		backgroundColor: colors.accent,
		// paddingHorizontal: 25,
		// paddingVertical: 12,
	},
	summary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
		padding: 10,
	},
	textAmount: {
		fontFamily: "open-sans-bold",
		fontSize: 18,
	},
	amount: {
		color: colors.primary,
	},
});

CartScreen.navigationOptions = {
	headerTitle: "Cart",
};
export default connect(null, { ...cartActions, ...orderActions })(CartScreen);
