import React from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	Button,
	ScrollView,
} from "react-native";
import { useSelector, connect } from "react-redux";
import * as cartActions from "../../shared/actions/cartActions";
import colors from "../constants/colors.js";

const PrestationDetailScreen = ({ navigation, addToCard }) => {
	const id = navigation.getParam("id");
	const prestationSelected = useSelector(({ prestation }) =>
		prestation.availablePrestations.find((p) => p.id === id)
	);

	return (
		<ScrollView>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: prestationSelected.imageUrl }}
				/>
			</View>
			<View style={styles.actions}>
				<Button
					color={colors.primary}
					title='Add to Card'
					onPress={() => {
						addToCard(prestationSelected);
					}}
				/>
			</View>

			<View>
				<Text style={styles.price}>
					$ {prestationSelected.price.toFixed(2)}
				</Text>
				<Text style={styles.description}>{prestationSelected.description}</Text>
			</View>
		</ScrollView>
	);
};
PrestationDetailScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: navigation.getParam("title"),
	};
};

const styles = StyleSheet.create({
	imageContainer: {
		width: "100%",
		height: 300,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	price: {
		fontFamily: "open-sans-bold",
		fontSize: 20,
		color: "#888",
		textAlign: "center",
		marginVertical: 20,
	},
	description: {
		fontFamily: "open-sans",
		fontSize: 14,
		textAlign: "center",
		marginHorizontal: 20,
	},
	actions: {
		marginVertical: 20,
		alignItems: "center",
	},
});
export default connect(null, cartActions)(PrestationDetailScreen);
