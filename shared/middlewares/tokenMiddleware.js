import { SIGN_IN, SIGN_OUT } from "../actions/types";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
const storage = AsyncStorage;

export const tokenMiddleware = (store) => (next) => (action) => {
	switch (action.type) {
		case SIGN_IN:
			storage.setItem("token", action.payload.token);
			storage.setItem("userId", JSON.stringify(action.payload.id));
			break;
		case SIGN_OUT:
			storage.removeItem("token");
			storage.removeItem("userId");
			break;
	}
	next(action);
};
