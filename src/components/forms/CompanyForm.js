import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import Spacers from "../ui/Spacers";
import colors from "../../constants/colors";

const CompanyForm = ({ onSubmit, buttonTitle, children }) => {
	return (
		<View style={styles.form}>
			{children}
			<Spacers />
			<Spacers>
				<Button
					style={styles.button}
					color={Platform.OS === "android" ? "white" : colors.primary}
					title={buttonTitle}
					onPress={onSubmit}
				/>
			</Spacers>
		</View>
	);
};
const styles = StyleSheet.create({
	form: {
		flex: 1,
		alignSelf: "stretch",
		marginHorizontal: 10,
	},
	linkLabel: {
		marginVertical: 20,
		textAlign: "center",
		fontFamily: "open-sans",
		fontSize: 17,
		color: colors.primary,
	},
	linkText: {
		fontFamily: "open-sans",
		fontSize: 17,
		color: colors.accent,
	},
	error: {
		textAlign: "center",
		fontFamily: "open-sans",
		fontSize: 15,
		color: "red",
	},
});

// export default reduxForm({
// 	form: "companyForm",
// 	enableReinitialize: true,
// 	destroyOnUnmount: false,
// })(CompanyForm);
export default CompanyForm;
// export default connect(mapStatToProps)(
// 	reduxForm({
// 		form: "companyForm",
// 		enableReinitialize: true,
// 		destroyOnUnmount: false,
// 	})(CompanyForm)
// );
