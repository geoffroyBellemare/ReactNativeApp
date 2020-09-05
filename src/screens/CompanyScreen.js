import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { reduxForm, FormSection } from "redux-form";
import * as authActions from "../../shared/actions/authAction.js";
import * as companyActions from "../../shared/actions/companyAction";
import CompanyForm from "../components/forms/CompanyForm";
import CompanyFormReview from "../components/forms/CompanyFormReview";
import Spacers from "../components/ui/Spacers";
import Loader from "../components/ui/Loader";
import colors from "../constants/colors.js";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/ui/HeaderButton";
import RenderFields from "../components/forms/inputFields/SectionFields";
import { renderField } from "../components/forms/inputFields/SectionFields";
import useStripeAccountSectionsHook from "../hooks/useStripeAccountSectionsHook";
import useErrorHooks from "../hooks/useErrorAlert";

import { ACCOUNT_TYPE } from "../../shared/fields/stripeFields.js";
//import COMPANY_SECTIONS_FIELDS from "../components/forms/fields/companyFields";
//Secret123#
//raoul1

const CompanyScreen = ({
	handleSubmit,
	navigation,
	companyClearErrMsg,
	moveBy,
	createAccount,
}) => {
	//const [step, setStep] = useState(0);
	const { step, loading, company, status, page } = useSelector(
		({ company }) => company
	);
	const { user } = useSelector(({ auth }) => auth);

	const {
		selectedSections: sections,
		isSectionReview,
		formValues,
		reviewSection,
	} = useStripeAccountSectionsHook();

	useErrorHooks(companyClearErrMsg);

	const onSubmit = handleSubmit((values) => {
		if (!isSectionReview) {
			moveBy(1);
			return;
		}
		// alert(status);
		// moveBy(1);
		createAccount(values, status, step, company);
	});

	const onPrevious = useCallback(() => {
		if (step === 0) {
			navigation.goBack();
			return;
		}
		moveBy(-1);
	}, [moveBy, step]);

	useEffect(() => {
		navigation.setParams({
			onSubmit,
			step,
			onPrevious,
			isSectionReview,
			title: status,
		});
	}, [step, isSectionReview, status]);

	if (loading) return <Loader />;
	if (status == "verified") return null;

	return (
		<KeyboardAvoidingView
			behavior='padding'
			keyboardVerticalOffset={100}
			style={styles.root}>
			<ScrollView contentContainerStyle={styles.scroll}>
				{isSectionReview ? (
					<CompanyFormReview
						onSubmit={onSubmit}
						onCancel={onPrevious}
						formValues={formValues}
						reviewSection={reviewSection}
					/>
				) : (
					<CompanyForm onSubmit={onSubmit} buttonTitle='Next'>
						<>
							{step === 0 && status === "company" && renderField(ACCOUNT_TYPE)}
							{sections[status]["pages"][step].map((section) => {
								return (
									<FormSection
										label={section.label}
										key={section.name}
										id={section.name}
										fields={section.fields}
										name={section.name}
										component={RenderFields}
										exclusif={section.exclusif || null}
										excludes={section.excludes || null}
									/>
								);
							})}
						</>
					</CompanyForm>
				)}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: colors.gray,
	},
	scroll: {
		justifyContent: "center",
		alignItems: "center",
		//marginHorizontal: 20,
	},
	form: {
		alignSelf: "stretch",
		marginHorizontal: 20,
		marginBottom: 100,
	},
	headerButton: {
		marginHorizontal: 20,
	},
	headerButtonText: {
		fontSize: 16,
		color: Platform.OS === "android" ? "white" : colors.primary,
	},
	titleSection: {
		fontSize: 16,
		fontFamily: "open-sans-bold",
		color: colors.primary,
	},
});
CompanyScreen.navigationOptions = (navData) => {
	const onSubmitFn = navData.navigation.getParam("onSubmit");
	const onPreviousFn = navData.navigation.getParam("onPrevious");
	const step = navData.navigation.getParam("step");
	const title = navData.navigation.getParam("title");
	const isSectionReview = navData.navigation.getParam("isSectionReview");
	const navOptions = {
		headerTitle: `${title} ${isSectionReview ? "Recapitulatif" : ""}`,
		headerTitleStyle: {
			fontSize: 20,
			color: Platform.OS === "android" ? "white" : colors.primary,
			fontFamily: "open-sans",
		},
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title={isSectionReview ? "Save" : "Next"} onPress={onSubmitFn} />
			</HeaderButtons>
		),
		// () => (
		// 	<TouchableOpacity style={styles.headerButton} onPress={saveFn}>
		// 		<Text style={styles.headerButtonText}>Save</Text>
		// 	</TouchableOpacity>
		// ),
	};
	if (1) {
		navOptions.headerLeft = () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='previous'
					iconName={
						Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
					}
					onPress={onPreviousFn}
				/>
			</HeaderButtons>
		);
	}
	return navOptions;
};
function validate(values) {
	const errors = {};
	errors.company = {};
	errors.person = {};
	if (
		values["company"] &&
		(!values["company"].name || values["company"].name.trim().length < 7)
	) {
		errors["company"]["name"] = "Please correct that info";
	}
	if (
		values["person"] &&
		(!values["person"].last_name ||
			values["person"].last_name.trim().length < 7)
	) {
		errors["person"]["last_name"] = "Please correct that info";
	}
	return errors;
}
function mapStatToProps({ company }) {
	return company;
}
export default connect(mapStatToProps, { ...authActions, ...companyActions })(
	reduxForm({
		form: "companyForm",
		validate,
		enableReinitialize: true,
		destroyOnUnmount: false,
	})(CompanyScreen)
);
