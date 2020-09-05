import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, LogBox } from "react-native";
import stripe from "tipsi-stripe";
import Button from "../components/Button";
import * as orderActions from "../../shared/actions/orderActions";

export default function App() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { client_secret, paymentMethodId } = useSelector(({ order }) => order);
	const [paymentMethod, setPaymentMethod] = useState(null);

	useEffect(() => {
		stripe.setOptions({
			publishableKey: "pk_test_N4ewHY6GPgws8Xxt3qpylRqc00hnmmHFJl",
		});
	}, []);
	useEffect(() => {
		if (client_secret && paymentMethodId) {
			console.log("---------cs", client_secret);
			console.log("---------pm", paymentMethodId);
			const fn = async () => {
				try {
					console.log("hit fx FN....");
					const res = await stripe.confirmPaymentIntent({
						clientSecret: client_secret,
						paymentMethodId: paymentMethodId,
					});
					console.log(res);
				} catch (error) {
					console.log(error.message);
				}
			};
			fn();
		}
	}, [client_secret, paymentMethodId]);

	handlePaymentIntent = () => {
		dispatch(orderActions.createPaymentIntent(paymentMethod.id));
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
		<View style={styles.container}>
			<Text style={styles.header}>Card Petit Form Example</Text>
			<Text style={styles.instruction}>
				Click button to show Card Form dialog.
			</Text>
			<Button
				text='Enter you card and pay'
				loading={loading}
				onPress={this.handleCardPayPress}
			/>
			{paymentMethod && (
				<Button
					text='Enter you card and pay'
					loading={loading}
					onPress={this.handlePaymentIntent}
				/>
			)}
			<View style={styles.token}>
				{paymentMethod && (
					<Text style={styles.instruction}>Token: {paymentMethod.tokenId}</Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		fontFamily: "open-sans-bold",
		fontSize: 40,
		textAlign: "center",
		margin: 10,
	},
	instruction: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5,
	},
	token: {
		height: 20,
	},
});
