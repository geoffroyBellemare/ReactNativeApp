import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-native";

export default (clearErrorMsg) => {
	const { error } = useSelector(({ company }) => company);
	const handleError = useCallback(() => {
		if (error) {
			Alert.alert("can t Create your company", error, [
				{
					text: "Cancel",
					style: "cancel",
					onPress: clearErrorMsg,
				},
			]);
		}
	}, [error, clearErrorMsg]);

	useEffect(() => {
		handleError();
	}, [handleError]);

	return [];
};
