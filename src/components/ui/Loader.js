import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../../constants/colors";

const Loader = (props) => {
	return (
		<View style={styles.loader}>
			<ActivityIndicator color={colors.primary} size='large' />
		</View>
	);
};

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
export default Loader;
