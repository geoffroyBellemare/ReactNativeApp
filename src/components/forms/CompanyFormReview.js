import React, { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import colors from "../../constants/colors";
import Spacers from "../../components/ui/Spacers";

const CompanyFormReview = ({
	formValues,
	reviewSection,
	onCancel,
	onSubmit,
}) => {
	let reviews = [
		{
			name: reviewSection.section.name,
			label: reviewSection.section.label,
			fields: [],
			isChildSection: false,
		},
	];
	reviewSection.section.fields.map(
		({ name, label, section = false, fields }) => {
			if (reviewSection.excludes.includes(name)) {
				return;
			}
			if (section) {
				reviews.push({ name, label, fields });
				return;
			}
			if (
				reviewSection.excludesFields &&
				reviewSection.excludesFields.includes(name)
			) {
				return;
			}
			reviews[0].fields.push({ name, label });
		}
	);

	return (
		<View style={styles.root}>
			{reviews.map(
				({ name: childSectionName, label, fields, isChildSection = true }) => {
					return (
						<Fragment key={childSectionName}>
							<View style={styles.header}>
								<Text style={styles.titleHeader}>{label}</Text>
							</View>
							<View style={styles.container}>
								{fields.map((field) => {
									return (
										<View style={styles.field} key={field.name}>
											<Text
												style={{
													...styles.label,
													width:
														reviewSection.name === "external_account"
															? "20%"
															: "40%",
												}}>
												{field.label}{" "}
											</Text>
											<Text style={styles.values}>
												{isChildSection
													? formValues[reviewSection.name][childSectionName][
															field.name
													  ]
													: formValues[reviewSection.name][field.name]}
											</Text>
										</View>
									);
								})}
							</View>
						</Fragment>
					);
				}
			)}
			<Spacers />
			<View style={styles.buttonContainer}>
				<Button
					buttonStyle={{ backgroundColor: colors.warning }}
					style={styles.button}
					color={Platform.OS === "android" ? "white" : colors.primary}
					title='cancel'
					onPress={onCancel}
				/>
				<Button
					style={styles.button}
					color={Platform.OS === "android" ? "white" : colors.primary}
					title='Save'
					onPress={onSubmit}
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	root: {
		width: "100%",
	},
	header: {
		marginLeft: 20,
		paddingTop: 20,
		paddingBottom: 10,
	},
	container: {
		backgroundColor: "white",
		paddingVertical: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: 20,
	},
	button: {
		width: 100,
	},
	field: {
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	label: {
		minWidth: 100,
		width: "40%",
		textAlign: "right",
		color: colors.darkGray,
		fontFamily: "open-sans",
		fontSize: 16,
	},
	values: {
		flex: 1,
		marginHorizontal: 10,
		textAlign: "left",
		fontFamily: "open-sans",
		fontSize: 16,
	},
	titleHeader: {
		fontSize: 20,
		fontFamily: "open-sans-bold",
		color: colors.primary,
	},
});

export default CompanyFormReview;
