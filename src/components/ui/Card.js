import React from "react";
import { View, StyleSheet } from "react-native";

const Card = ({ children, style }) => {
	return <View style={{ ...styles.root, ...style }}>{children}</View>;
};
const styles = StyleSheet.create({
	root: {
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.26,
		shadowColor: "black",
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: "white",
	},
});
export default Card;
