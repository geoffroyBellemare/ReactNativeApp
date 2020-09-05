import React, { useState, useEffect, useCallback } from "react";
import {
	FlatList,
	View,
	Text,
	Button,
	ActivityIndicator,
	StyleSheet,
	Alert,
} from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/ui/HeaderButton";
import PrestationItem from "../components/shop/PrestationItem";
import * as cartActions from "../../shared/actions/cartActions";
import * as prestationsActions from "../../shared/actions/prestationAction";
import colors from "../constants/colors.js";

const PrestationsOverviewScreen = (props) => {
	const {
		navigation,
		addToCart,
		updateCartItem,
		fetchPrestations,
		clearErrorCart,
	} = props;
	const [isLoading, setIsLoading] = useState(false);
	const { prestations, error } = useSelector(
		({ prestation: { availablePrestations, error } }) => {
			return { prestations: availablePrestations, error };
		}
	);
	const { errorCart, items } = useSelector(({ cart: { items, error } }) => {
		return { items, errorCart: error };
	});

	useEffect(() => {
		handleErrorCart();
	}, [handleErrorCart]);
	const handleAddToCart = (prestation) => {
		const cartItem = items[prestation.id];
		if (cartItem && !cartItem.checkOutSessionId) {
			updateCartItem(cartItem, prestation);
			alert("pas encore proceed dc update");
		} else {
			alert("new commande");
			addToCart(prestation);
		}
	};
	const handleErrorCart = useCallback(() => {
		if (errorCart) {
			Alert.alert("can t adding to cart", error, [
				{ text: "Cancel", style: "cancel", onPress: clearErrorCart },
			]);
		}
	}, [errorCart, clearErrorCart]);

	const loading = useCallback(async () => {
		setIsLoading(true);
		await fetchPrestations();
		setIsLoading(false);
	}, [setIsLoading, fetchPrestations]);

	useEffect(() => {
		loading();
	}, [loading]);

	useEffect(() => {
		const listener = navigation.addListener("willFocus", loading);
		return () => {
			listener.remove();
		};
	}, [loading]);
	//const dispatch = useDispatch();
	const handleSelect = (prestation) => {
		navigation.navigate("prestationDetail", {
			id: prestation.id,
			title: prestation.title,
		});
	};
	if (isLoading) {
		return (
			<View style={styles.activityIndicator}>
				<ActivityIndicator size='large' color={colors.primary} />
			</View>
		);
	}
	if (error) {
		return (
			<View style={{ ...styles.activityIndicator }}>
				<Text style={styles.error}>{error} </Text>
			</View>
		);
	}
	if (!isLoading && !prestations.length) {
		return (
			<View style={styles.activityIndicator}>
				<Text>No AVailables Prestation </Text>
			</View>
		);
	}

	return (
		<FlatList
			data={prestations}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<PrestationItem
					{...itemData.item}
					onSelect={() => handleSelect(itemData.item)}>
					<Button
						color={colors.primary}
						title='View Detail'
						onPress={() => handleSelect(itemData.item)}
					/>
					<Button
						color={colors.primary}
						title='To Card'
						onPress={() => {
							handleAddToCart(itemData.item);
							//addToCart(itemData.item);
						}}
					/>
				</PrestationItem>
			)}
		/>
	);
};
const styles = StyleSheet.create({
	activityIndicator: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	error: {
		color: "red",
		fontFamily: "open-sans",
		fontSize: 20,
	},
});
PrestationsOverviewScreen.navigationOptions = ({ navigation }) => {
	return {
		headerTitle: "Toutes les Prestations",
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Cart'
					iconName='md-cart'
					onPress={() => navigation.navigate("cart")}
				/>
			</HeaderButtons>
		),
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Orders'
					iconName='md-menu'
					onPress={() => navigation.toggleDrawer()}
				/>
			</HeaderButtons>
		),
	};
};
connect();
export default connect(null, { ...cartActions, ...prestationsActions })(
	PrestationsOverviewScreen
);
