import React from "react";
import { WebView } from "react-native-webview";
import { STRIPE } from "../../store/actions/orders";

import { stripeCheckoutRedirectHTML } from "../../store/actions/orders";

const PurchasePrestation = ({ checkOutSessionID, onSuccess, onCancel }) => {
	// TODO: this should come from some service/state store

	const onSuccessHandler = () => {
		/* TODO: do something */
		onSuccess();
	};
	const onCanceledHandler = () => {
		/* TODO: do something */
		onCancel();
	};

	// Called everytime the URL stats to load in the webview
	const onLoadStart = (syntheticEvent) => {
		const { nativeEvent } = syntheticEvent;
		if (nativeEvent.url === STRIPE.SUCCESS_URL) {
			onSuccessHandler();
			return;
		}
		if (nativeEvent.url === STRIPE.CANCELED_URL) {
			onCanceledHandler();
		}
	};

	// Render
	if (!checkOutSessionID) {
		alert("pas de checkOutSessionID");
		return null;
	}

	return (
		<WebView
			originWhitelist={["*"]}
			source={{ html: stripeCheckoutRedirectHTML(checkOutSessionID) }}
			onLoadStart={onLoadStart}
		/>
	);
};

export default PurchasePrestation;
