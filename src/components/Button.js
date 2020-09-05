import React, { PureComponent } from "react";
import {
	View,
	Text,
	TouchableHighlight,
	ActivityIndicator,
	Platform,
	StyleSheet,
} from "react-native";
import colors from "../constants/colors.js";

import PropTypes from "prop-types";

export default class Button extends PureComponent {
	static propTypes = {
		text: PropTypes.string.isRequired,
		disabledText: PropTypes.string,
		loading: PropTypes.bool,
		disabled: PropTypes.bool,
		style: PropTypes.any,
		onPress: PropTypes.func.isRequired,
	};

	static defaultProps = {
		disabledText: "",
		loading: false,
		disabled: false,
		style: undefined,
	};

	handlePress = (event) => {
		const { loading, disabled, onPress } = this.props;

		if (loading || disabled) {
			return;
		}

		if (onPress) {
			onPress(event);
		}
	};

	render() {
		const {
			text,
			disabledText,
			loading,
			disabled,
			style,
			...rest
		} = this.props;

		return (
			<TouchableHighlight
				{...rest}
				style={[styles.button, style]}
				underlayColor='rgba(0,0,0,0.5)'
				onPress={this.handlePress}>
				<View style={styles.container}>
					{loading && <ActivityIndicator animating size='small' />}
					{!loading && !disabled && <Text style={styles.text}>{text}</Text>}
					{!loading && disabled && (
						<Text style={styles.text}>{disabledText || text}</Text>
					)}
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		//padding: 8,
		margin: 10,
		height: Platform.OS === "ios" ? 40 : 40,
		minWidth: 160,
		overflow: "hidden",
		//borderWidth: 1,
		borderRadius: 4,
		backgroundColor: colors.primary,
		alignItems: "center",
		display: "flex",
	},
	container: {
		flex: 1,
		justifyContent: "center",
	},
	text: {
		fontFamily: "open-sans",
		fontSize: 18,
		color: "white",
	},
});
