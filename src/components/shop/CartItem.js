import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";

const CartItem = ({ id, quantity, title, totalAmount, onDelete = false }) => {
	return (
		<View style={styles.root}>
			<View style={styles.itemData}>
				<Text style={styles.quantity}>{quantity}</Text>
				<Text style={styles.mainText}> {title}</Text>
			</View>
			<View style={styles.itemData}>
				<Text style={styles.mainText}>{totalAmount.toFixed(2)}</Text>
				{onDelete && (
					<TouchableOpacity
						onPress={() => onDelete(id)}
						style={styles.deleteButton}>
						<Ionicons
							name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
							size={23}
							color='red'
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		backgroundColor: "white",
		//marginHorizontal: 20,
	},
	itemData: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	quantity: {
		fontFamily: "open-sans",
		fontSize: 16,
		color: "#888",
	},
	mainText: {
		fontFamily: "open-sans-bold",
		fontSize: 16,
	},
	deleteButton: {
		marginLeft: 20,
	},
});

export default CartItem;
