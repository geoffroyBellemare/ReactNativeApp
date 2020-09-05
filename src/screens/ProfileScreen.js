import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Accessory } from "react-native-elements";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from "react-native";
import colors from "../constants/colors";
import Spacers from "../components/ui/Spacers";

const ProfileScreen = ({ navigation }) => {
	const FIELDS = [
		{
			id: 1,
			label: "Mes commandess",
			onPress: () => {
				navigation.navigate("Company");
			},
		},
		{
			id: 2,
			label: "Ma companie",
			onPress: () => {
				navigation.navigate("Company");
			},
		},
		{
			id: 3,
			label: "Mon profil",
			onPress: () => {
				navigation.navigate("Company");
			},
		},
	];
	const Touchable =
		Platform.OS === "android" && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.root}>
				<Avatar
					rounded
					size={200}
					icon={{ name: "user", type: "font-awesome" }}
					containerStyle={{
						backgroundColor: colors.primary,
						marginTop: 20,
						marginBottom: 30,
					}}
					showEditButton
				/>
				<View style={styles.containerCell}>
					{FIELDS.map(({ id, label, onPress }) => (
						<View key={id} style={styles.cell}>
							<Touchable onPress={onPress} useForground>
								<Spacers>
									<Text style={styles.label}>{label}</Text>
								</Spacers>
							</Touchable>
						</View>
					))}
				</View>
			</View>
		</SafeAreaView>
	);
};
ProfileScreen.navigationOptions = () => {
	return {
		headerShown: false,
	};
};
const styles = StyleSheet.create({
	avatar: {
		margin: 10,
	},
	root: {
		alignItems: "center",
		flex: 1,
	},
	containerCell: {
		paddingTop: 50,
		justifyContent: "flex-start",
		alignItems: "center",
		flex: 1,
		width: "100%",
	},
	cell: {
		alignItems: "center",
		alignSelf: "stretch",
	},
	label: {
		fontFamily: "open-sans-bold",
		fontSize: 25,
	},
});
export default ProfileScreen;
