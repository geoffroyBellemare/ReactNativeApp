import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	INDIVIDUAL_FORM_PAGES,
	//COMPANY_FORM_PAGES,
	COMPANY_FORM_PAGES,
} from "../../shared/fields/stripeFields";

export default () => {
	const [selectedSections, setSelectedSections] = useState(COMPANY_FORM_PAGES);
	const [isSectionReview, setIsSectionReview] = useState(false);
	const [reviewSection, setReviewSection] = useState(null);
	const { step, status } = useSelector(({ company }) => company);
	const formValues = useSelector(({ form }) => form.companyForm.values);
	useEffect(() => {
		const sections =
			formValues.business_type == 1
				? INDIVIDUAL_FORM_PAGES
				: COMPANY_FORM_PAGES;
		setSelectedSections(sections);
		//console.log(sections.company.pages[0]);
		// if (!sections[step]) {
		// 	setReviewSection([]);
		// 	return;
		// }
		// if (sections[step][0].sectionReview) {
		// 	setIsSectionReview(sections[step][0].sectionReview);
		// 	setReviewSection(sections[step][0]);
		// } else {
		// 	setIsSectionReview(false);
		// }
		console.log("status :", status);
		console.log("stap :", step);
		if (!sections[status]["pages"][step]) {
			setReviewSection([]);
			return;
		}
		if (sections[status]["pages"][step][0].sectionReview) {
			setIsSectionReview(sections[status]["pages"][step][0].sectionReview);
			setReviewSection(sections[status]["pages"][step][0]);
		} else {
			setIsSectionReview(false);
		}
	}, [formValues.business_type, step, status]);

	return { selectedSections, isSectionReview, formValues, reviewSection };
};
