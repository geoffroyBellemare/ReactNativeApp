import React, { useState } from "react";
import {
	View,
	Button,
	Platform,
	StyleSheet,
	Text,
	TextInput,
} from "react-native";
import moment from "moment";
//import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../../constants/colors";
import { useDispatch } from "react-redux";
import { change } from "redux-form";

const DateField = ({
	formName,
	inputProps,
	input,
	label,
	meta: { touched, error, warning },
}) => {
	const [date, setDate] = useState(new Date(1598051730000));
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		const dateString = moment(currentDate).format("DD/MM/YYYY");
		//console.log(moment(moment(currentDate).format("DD/MM/YYYY"), "DD/MM/YYYY"));
		dispatch(change(formName, input.name, dateString));
		setShow(Platform.OS === "ios");
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};

	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{label}</Text>

			<View>
				{true && <Button onPress={showDatepicker} title='Show date picker!' />}
			</View>
			{/* {show && (
				<DateTimePicker
					testID='dateTimePicker'
					value={date}
					mode={mode}
					is24Hour={true}
					textColor={colors.primary}
					display='default'
					onChange={onChange}
				/>
			)} */}
			<TextInput
				style={{
					...styles.input,
					color: touched && error ? "red" : "#888",
					borderBottomColor: touched && error ? "red" : "#ccc",
				}}
				onChangeText={input.onChange}
				{...input}
				{...inputProps}
				value={input.value.toString()}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	formControl: {
		marginTop: 10,
		width: "100%",
	},
	label: {
		fontSize: 16,
		fontFamily: "open-sans-bold",
		color: colors.primary,
	},
	error: {
		fontFamily: "open-sans",
		fontSize: 15,
		color: "red",
	},
	input: {
		textAlign: "center",
		marginTop: 5,
		marginHorizontal: 20,
		paddingVertical: 5,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		fontSize: 20,
		fontFamily: "open-sans",
		marginHorizontal: 2,
	},
});

export default DateField;
