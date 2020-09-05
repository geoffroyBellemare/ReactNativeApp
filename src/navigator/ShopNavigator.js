import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import ResolveAuthScreen from "../screens/ResolveAuthScreen";
import HomeScreen from "../screens/HomeScreen";
import PrestationsOverviewScreen from "../screens/PrestationsOverviewScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import CompanyScreen from "../screens/CompanyScreen";
import colors from "../constants/colors";
import HomeIconWithBadge from "../components/ui/HomeIconWithBadge";
import PrestationDetailScreen from "../screens/PrestationDetailScreen";
const defaultNavigationOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? colors.primary : "",
	},
	headerTitleStyle: { fontFamily: "open-sans-bold" },
	headerBackTitleStyle: { fontFamily: "open-sans-bold" },
	headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
};
const authNavigator = createStackNavigator(
	{
		Resolve: ResolveAuthScreen,
		Signup: SignupScreen,
		Signin: SigninScreen,
		Company: HomeScreen /*CompanyScreen*/,
	},
	{
		defaultNavigationOptions,
	}
);
const profileNavigator = createStackNavigator({
	Profile: ProfileScreen,
	Company: CompanyScreen,
});
const PrestationNavigator = createStackNavigator(
	{
		prestationOverview: PrestationsOverviewScreen,
		prestationDetail: PrestationDetailScreen,
		cart: CartScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (config) => (
				<Ionicons
					name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
					size={23}
					color={config.tintColor}
				/>
			),
		},
		defaultNavigationOptions,
	}
);
const mainNavigator = createBottomTabNavigator(
	{
		Home: PrestationNavigator,
		Profile: profileNavigator,
		Cart: CartScreen,
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let IconComponent = Ionicons;
				let iconName;
				if (routeName === "Home") {
					iconName = focused
						? "ios-information-circle"
						: "ios-information-circle-outline";
					// Sometimes we want to add badges to some icons.
					// You can check the implementation below.
					IconComponent = HomeIconWithBadge;
				} else if (routeName === "Profile") {
					iconName = focused ? "ios-list-box" : "ios-list";
				} else if (routeName === "Cart") {
					iconName = Platform.OS === "android" ? "md-cart" : "ios-cart";
				}

				// You can return any component that you like here!
				return <IconComponent name={iconName} size={25} color={tintColor} />;
			},
		}),
		tabBarOptions: {
			activeTintColor: "tomato",
			inactiveTintColor: "gray",
		},
	}
);

const shopNavigator = createSwitchNavigator({
	auth: authNavigator,
	main: mainNavigator,
});
export default createAppContainer(shopNavigator);
