import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import * as authActions from "../../shared/actions/authAction.js";

const ResolveAuthScreen = ({ tryLocalSignin, navigation }) => {
	useEffect(() => {
		const listener = navigation.addListener("willFocus", () => {
			alert("resolve");
			tryLocalSignin(navigation.navigate);
		});
		return () => {
			listener.remove();
		};

		//
	}, []);
	return null;
};
export default connect(null, authActions)(ResolveAuthScreen);
