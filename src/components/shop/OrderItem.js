import React, { useState } from "react";
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
import { QRCode } from "react-native-custom-qr-codes-expo";
import CartItem from "./CartItem";
import Card from "../ui/Card";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const OrderItem = ({ id, items, date, totalAmount }) => {
	const [isShowDetail, setIsShowDetail] = useState(false);
	return (
		<Card style={styles.root}>
			<View style={styles.summary}>
				<Text style={styles.totalAmount}>$ {totalAmount.toFixed(2)}</Text>
				<Text style={styles.date}>{date}</Text>
			</View>
			<Button
				color={colors.primary}
				title='Show Details'
				onPress={() => setIsShowDetail((prev) => !prev)}
			/>
			<View style={styles.details}>
				<QRCode content='https://hhhhhhz' />
				{isShowDetail &&
					items.map((cartItem) => (
						<CartItem
							key={cartItem.cartItemId.toString()}
							{...cartItem}
							title={cartItem.prestation.title}
							id={cartItem.cartItemId}
						/>
					))}
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	root: {
		margin: 20,
		padding: 10,
		alignItems: "center",
	},
	summary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginBottom: 15,
	},
	totalAmount: {
		fontFamily: "open-sans-bold",
		fontSize: 16,
	},
	date: {
		fontFamily: "open-sans",
		fontSize: 14,
		textAlign: "center",
		color: "#888",
	},
	details: {
		color: "#FF9900",
		alignSelf: "stretch",
	},
});

export default OrderItem;
