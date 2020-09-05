import axios from "axios";
import moment from "moment";
import dev from "../config/dev";
import { getSearchParams } from "../utils/paramsUtils";

const stripe = axios.create({
	baseURL: "https://api.stripe.com/v1",
	headers: {
		Content_Type: "application/json;charset=UTF-8",
	},
	auth: {
		username: "",
		password: "",
	},
});
export default stripe;
export const stripeUpload = async (file) => {
	let newFile;
	try {
		if (typeof file !== "object") {
			newFile = {
				uri: file,
				type: "image/jpeg", // or photo.type
				name: "identity_photo",
			};
		} else {
			newFile = file[0];
		}
		const data = new FormData();
		data.append("file", newFile);
		data.append("purpose", "identity_document");
		const fileResult = await fetch("https://uploads.stripe.com/v1/files", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${dev.stripePublicKey}`,
			},
			body: data,
		});
		const fileData = await fileResult.json();

		if (fileData.error) {
			throw fileData.error;
		}
		return fileData;
	} catch (e) {
		throw e;
	}
};
export const stripeToken = async (name, jsonData) => {
	try {
		const { data } = await stripe.post(
			"/tokens",
			getSearchParams(name, jsonData)
		);
		return data;
	} catch (e) {
		throw e;
	}
};

export const addVerifParams = async (params, document, side, file) => {
	try {
		const { id } = await stripeUpload(file);
		if (!params.verification[document]) {
			params.verification[document] = {};
		}
		params.verification[document][side] = id;
	} catch (e) {
		throw e;
	}
};
export const stripeAddVerificationParams = async (data) => {
	//const { individual: data = {} } = values;
	if (data.verification) {
		const verification = data.verification;
		data.verification = {};
		try {
			await Promise.all(
				Object.entries(verification).map(async ([key, value]) => {
					const documents = key.split("_");
					let fieldName;
					let side;
					if (documents.length === 2) {
						side = documents[1];
						fieldName = "document";
					} else if (documents.length === 3) {
						side = documents[2];
						fieldName = "additional_document";
					}
					try {
						await addVerifParams(data, fieldName, side, value);
					} catch (e) {
						throw e;
					}
				})
			);
		} catch (e) {
			throw e;
		}
	} else {
		throw Error("You Must Provide all verification Documents");
	}
};
export const stripeCompanyParams = (company_info) => {
	let params = {};
	params.business_type = "company";
	params.tos_shown_and_accepted = true;
	params.company = {
		...company_info,
	};
	return params;
};

export const stripeIndividualParams = (individual) => {
	let params = {};

	params.individual = {
		...individual,
	};
	if (individual.dob) {
		var dob = moment(individual.dob, "DD/MM/YYYY").toDate();
		params.individual.dob = {
			day: dob.getDate(),
			month: dob.getMonth(),
			year: dob.getFullYear(),
		};
	}
	return params;
};
export const stripePersonParams = (person_info) => {
	var dob = moment(person_info.dob, "DD/MM/YYYY").toDate();
	// const relationship = {
	// 	director: true,
	// 	executive: true,
	// 	owner: true,
	// 	representative: false,
	// 	title: "CEO",
	// };
	const relationship = {
		director: true,
		executive: true,
		owner: false,
		representative: true,
		title: "CEO",
	};
	const person = {
		...person_info,
		dob: {
			day: dob.getDate(),
			month: dob.getMonth(),
			year: dob.getFullYear(),
		},
		relationship,
	};

	return person;
};

export const stripeUpdatePersonParams = () => {
	const relationship = {
		// director: false,
		// executive: true,
		// owner: false,
		representative: false,
		//title: "CEO",
	};
	const person = {
		relationship,
	};

	return person;
};
