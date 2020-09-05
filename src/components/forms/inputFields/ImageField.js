import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Permissions } from "react-native-unimodules";
import { Avatar, Text } from "react-native-elements";

import {
	TextInput,
	View,
	Button,
	Image,
	StyleSheet,
	Platform,
	Alert,
	TouchableOpacity,
	TouchableNativeFeedback,
} from "react-native";
import { change } from "redux-form";
import { useDispatch } from "react-redux";
import colors from "../../../constants/colors";

const ImageField = ({
	formName,
	onImageTaken,
	type,
	mimeType,
	inputProps,
	input,
	label,
	meta: { touched, error, warning },
}) => {
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();
	const Touchable =
		Platform.OS === "android" && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity;
	const verifyPermission = async () => {
		try {
			const result = await Permissions.askAsync(
				Permissions.CAMERA,
				Permissions.CAMERA_ROLL
			);
			if (result.status !== "granted") {
				Alert.alert(
					"No Permissions",
					"Sorry, we need grant camera permissions to make this work!",
					[{ text: "Ok" }]
				);
				return false;
			}
			return true;
		} catch (error) {
			return false;
		}
	};
	const takeImageHandler = async () => {
		const hasPermission = await verifyPermission();
		if (!hasPermission) {
			return;
		}
		// let result = await ImagePicker.launchCameraAsync({
		// 	mediaTypes: ImagePicker.MediaTypeOptions.All,
		// 	allowsEditing: true,
		// 	aspect: [4, 3],
		// 	quality: 1,
		// });
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			console.log(formName);
			console.log(input.name);
			//onImageTaken(result.uri);
			dispatch(change(formName, input.name, result.uri));
			setImage(result.uri);
		}
	};

	return (
		<View style={styles.imagePicker}>
			<Touchable style={styles.touchable} onPress={takeImageHandler}>
				<View style={styles.imagePreview}>
					<TextInput
						editable={false}
						style={{
							...styles.input,
							color: touched && error ? "red" : "#888",
							borderBottomColor: touched && error ? "red" : "#ccc",
						}}
						onChangeText={input.onChange}
						{...input}
						{...inputProps}
					/>

					{!image && (
						<Avatar
							rounded
							size={160}
							icon={{ name: "user", type: "font-awesome" }}
							containerStyle={{
								backgroundColor: colors.primary,
							}}
							showEditButton
						/>
					)}
					{image && <Image source={{ uri: image }} style={styles.image} />}
					<Button
						title='Select your profile photo'
						color={Platform.OS === "android" ? "white" : colors.primary}
					/>
				</View>
			</Touchable>
			{touched && error && <Text style={styles.error}>{error}</Text>}
			{warning && <Text style={styles.warning}>{warning}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: "center",
		//marginBottom: 5,
	},
	touchable: {
		width: "100%",
		height: 200,
		borderColor: "#ccc",
	},
	imagePreview: {
		width: "100%",
		height: "100%",
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 160,
		height: 160,
		borderRadius: 80,
	},
	error: {
		fontFamily: "open-sans",
		fontSize: 15,
		color: "red",
	},
	input: {
		position: "absolute",
		opacity: 0,
		marginTop: 5,
		marginBottom: 15,
		marginHorizontal: 20,
		paddingVertical: 5,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		fontSize: 20,
		fontFamily: "open-sans",
		marginHorizontal: 2,
	},
});
export default ImageField;
