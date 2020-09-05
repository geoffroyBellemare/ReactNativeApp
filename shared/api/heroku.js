import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
//admin
//secret123#
const instance = axios.create({
	baseURL: "https://47eef4bd91da.ngrok.io/api",
	//baseURL: "https://with.herokuapp.com/api",
});
//tacher
instance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem("token");
		//console.log("tok ----------   ", token);
		if (token && config.secure) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			config.headers.Authorization = "";
		}

		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);
export default instance;
