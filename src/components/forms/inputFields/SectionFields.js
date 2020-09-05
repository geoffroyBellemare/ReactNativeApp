import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Field, FormSection } from "redux-form";

import InputField from "./InputField";
import ImageField from "./ImageField";
import CheckBoxField from "./CheckBoxField";
import DateField from "./DateField";
import Spacers from "../../ui/Spacers";
import colors from "../../../constants/colors";

const RenderFields = (props) => {
	const {
		fields,
		id: name,
		exclusif = null,
		excludes = null,
		label = null,
	} = props;

	return (
		<View name={name} key={name}>
			<Spacers />
			<Text style={styles.textTitle}>{label}</Text>
			<Spacers />
			<Spacers />

			{fields.map((field) => {
				if (exclusif && !exclusif.includes(field.name)) return;
				if (excludes && excludes.includes(field.name)) return;
				if (field.section) {
					return (
						<FormSection
							key={field.name}
							id={field.name}
							fields={field.fields}
							name={field.name}
							component={Section}
						/>
					);
				}
				return renderField(field);
			})}
		</View>
	);
};
export const renderField = (field, completion) => {
	let component;
	switch (field.name) {
		case "image_profile":
		case "image_identity":
		case "document_front":
		case "document_back":
		case "additional_document_front":
			component = ImageField;
			break;
		case "business_type":
			component = CheckBoxField;
			break;
		case "dob":
			component = DateField;
			break;
		default:
			component = InputField;
			break;
	}

	return (
		<View key={field.name}>
			<Field
				formName='companyForm'
				{...field}
				component={component}
				completion={completion}
			/>
			<Spacers />
		</View>
	);
};
const Section = ({ fields, id: name }) => {
	return (
		<View name={name} key={name}>
			{fields.map((field) => {
				return renderField(field);
			})}
		</View>
	);
};
const styles = StyleSheet.create({
	textTitle: {
		textAlign: "center",
		color: colors.primary,
		fontSize: 20,
		fontFamily: "open-sans-bold",
	},
});
export default RenderFields;
