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
import Card from "../../components/ui/Card";
import colors from "../../constants/colors";

const ProductItem = ({
	title,
	imageUrl,
	price,
	quantity,
	onSelect,
	onSubmit,
	children,
}) => {
	const Touchable =
		Platform.OS === "android" && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity;
	return (
		<Card style={styles.prestation}>
			<Touchable onPress={onSelect} useForground>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={{ uri: imageUrl }} />
				</View>
				<View style={{ ...styles.details }}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.price}>${price.toFixed(2)}</Text>
					<Text style={styles.price}>{quantity}</Text>
				</View>
				<View style={styles.actions}>{children}</View>
			</Touchable>
		</Card>
	);
};
const styles = StyleSheet.create({
	prestation: {
		height: 300,
		margin: 20,
	},
	imageContainer: {
		width: "100%",
		height: "60%",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 18,
		//marginVertical: 4,
	},
	price: {
		fontFamily: "open-sans",
		fontSize: 14,
		color: "#888",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "25%",
		paddingHorizontal: 20,
	},
	details: {
		alignItems: "center",
		//justifyContent: "center",
		height: "15%",
		padding: 10,
		//backgroundColor: "black",
	},
});
export default ProductItem;
