import { NavigationActions } from "react-navigation";
let navigator;

export const setNavigator = (nav) => {
	navigator = nav;
};
export const goBack = () => {
	navigator.dispatch(NavigationActions.back());
};
export const navigate = (routeName, params) => {
	navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
};
