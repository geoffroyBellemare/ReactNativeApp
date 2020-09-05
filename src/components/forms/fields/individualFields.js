const COMPANY_INFOS_FIELDS = [
	{
		label: "Business Type",
		name: "business_type",
		options: [
			{
				title: "individual",
				name: "individual",
				key: 1,
			},
			{
				title: "company",
				name: "company",
				key: 2,
			},
		],
	},

	{
		section: true,
		label: "External account",
		name: "external_account",
		fields: [
			{
				label: "Devise :",
				name: "currency",
				inputProps: {
					autoCorrect: false,
					autoCapitalize: "none",
					keyboardType: "default",
					placeholder: "Choisir sa devise",
					returnKeyType: "next",
				},
			},
			{
				label: "Pays :",
				name: "country",
				inputProps: {
					autoCorrect: false,
					autoCapitalize: "none",
					keyboardType: "default",
					placeholder: "Select Your Country",
					returnKeyType: "next",
				},
			},
			{
				label: "IBAN :",
				name: "account_number",
				inputProps: {
					autoCorrect: false,
					autoCapitalize: "none",
					keyboardType: "default",
					placeholder: "FR1420041010050500013M02606",
					returnKeyType: "next",
				},
			},
			{
				label: "Confirmer IBAN :",
				name: "confirm",
				inputProps: {
					autoCorrect: false,
					autoCapitalize: "none",
					keyboardType: "default",
					placeholder: "Choisir sa devise",
					returnKeyType: "next",
				},
			},
		],
	},
	{
		section: true,
		name: "company",
		label: "Company Infos",
		fields: [
			{
				label: "Company Name :",
				name: "name",
				inputProps: {
					autoCorrect: false,
					autoCapitalize: "none",
					keyboardType: "default",
					placeholder: "Choisir sa devise",
					returnKeyType: "next",
				},
			},
			{
				label: "Line :",
				name: "line1",
				inputProps: {
					autoCorrect: false,
					autoCapitalize: "none",
					keyboardType: "default",
					placeholder: "Choisir sa devise",
					returnKeyType: "next",
				},
			},
		],
	},
];
const INDIVIDUAL = {
	section: true,
	name: "individual",
	label: "Individual Infos",
	fields: [
		{
			label: "First Name",
			name: "first_name",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			label: "Last Name",
			name: "last_name",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			label: "Email",
			name: "email",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			label: "Phone:",
			name: "phone",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Choisir sa devise",
				returnKeyType: "next",
			},
		},
		{
			label: "Birth Date",
			name: "dob",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			section: true,
			name: "address",
			label: "Company Address",
			fields: [
				{
					label: "Line1 :",
					name: "line1",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "State :",
					name: "state",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "City:",
					name: "city",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "Postal Code :",
					name: "postal_code",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
			],
		},
		{
			section: true,
			name: "verification",
			label: "Please Select or Scan your Infos",
			fields: [
				{
					label: "Select or Scan your ID card",
					name: "document_front",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Please enter yours here!!",
						returnKeyType: "next",
					},
				},
				{
					label: "Select or Scan your ID card",
					name: "additional_document_front",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Please enter yours here!!",
						returnKeyType: "next",
					},
				},
			],
		},
	],
};
const COMPANY = {
	section: true,
	name: "company",
	label: "Company Infos",
	fields: [
		{
			label: "Name :",
			name: "name",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Choisir sa devise",
				returnKeyType: "next",
			},
		},
		{
			label: "Phone :",
			name: "phone",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Choisir sa devise",
				returnKeyType: "next",
			},
		},
		{
			label: "Tax Id:",
			name: "tax_id",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Choisir sa devise",
				returnKeyType: "next",
			},
		},

		{
			section: true,
			name: "address",
			label: "Company Address",
			fields: [
				{
					label: "Line1 :",
					name: "line1",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "Line2 :",
					name: "line2",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "State :",
					name: "state",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "City:",
					name: "city",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "Postal Code :",
					name: "postal_code",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
			],
		},
		{
			section: true,
			name: "verification",
			label: "Please Select or Scan your Infos",
			fields: [
				{
					label: "Select or Scan your ID card",
					name: "document_front",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Please enter yours here!!",
						returnKeyType: "next",
					},
				},
			],
		},
	],
};
const BUSINESS_PROFILE = {
	section: true,
	label: "Info about Business",
	name: "business_profile",
	fields: [
		{
			label: "Url :",
			name: "url",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			label: "Merchant category code",
			name: "mcc",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
	],
};

const ACCOUNT_TYPE = {
	label: "Business Type",
	name: "business_type",
	options: [
		{
			title: "individual",
			name: "individual",
			key: 1,
		},
		{
			title: "company",
			name: "company",
			key: 2,
		},
	],
};

const PERSON = {
	section: true,
	label: "Personnel Info",
	name: "person",
	fields: [
		{
			label: "First Name",
			name: "first_name",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			label: "Last Name",
			name: "last_name",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			label: "Email",
			name: "email",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			label: "Phone",
			name: "phone",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			label: "Birth Date",
			name: "dob",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Please enter yours here!!",
				returnKeyType: "next",
			},
		},
		{
			section: true,
			name: "address",
			label: "Personal Address",
			fields: [
				{
					label: "Line1 :",
					name: "line1",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "Line2 :",
					name: "line2",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "city :",
					name: "city",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "State :",
					name: "state",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
				{
					label: "Postal Code :",
					name: "postal_code",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Choisir sa devise",
						returnKeyType: "next",
					},
				},
			],
		},
		{
			section: true,
			name: "verification",
			label: "Please Select or Scan your Infos",
			fields: [
				{
					label: "Select or Scan your ID card",
					name: "document_front",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Please enter yours here!!",
						returnKeyType: "next",
					},
				},
				{
					label: "Select or Scan paper with your location",
					name: "additional_document_front",
					inputProps: {
						autoCorrect: false,
						autoCapitalize: "none",
						keyboardType: "default",
						placeholder: "Please enter yours here!!",
						returnKeyType: "next",
					},
				},
			],
		},
	],
};

const EXTERNAL_ACCOUNT = {
	section: true,
	name: "external_account",
	label: "Banque Account",
	fields: [
		{
			label: "Devise :",
			name: "currency",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Choisir sa devise",
				returnKeyType: "next",
			},
		},
		{
			label: "Pays :",
			name: "country",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Select Your Country",
				returnKeyType: "next",
			},
		},
		{
			label: "IBAN :",
			name: "account_number",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "FR1420041010050500013M02606",
				returnKeyType: "next",
			},
		},
		{
			label: "Confirmer IBAN :",
			name: "confirm",
			inputProps: {
				autoCorrect: false,
				autoCapitalize: "none",
				keyboardType: "default",
				placeholder: "Choisir sa devise",
				returnKeyType: "next",
			},
		},
	],
};
const COMPANY_FORM_PAGESERRASE = [
	[
		{
			id: COMPANY.name,
			fields: COMPANY.fields,
			name: COMPANY.name,
			excludes: ["address", "verification"],
		},
	],
	[
		{
			id: COMPANY.name,
			fields: COMPANY.fields,
			name: COMPANY.name,
			exclusif: ["address"],
		},
	],
	[
		{
			id: COMPANY.name,
			fields: COMPANY.fields,
			name: COMPANY.name,
			exclusif: ["verification"],
		},
	],
	[
		{
			sectionReview: true,
			id: COMPANY.name,
			fields: COMPANY.fields,
			section: COMPANY,
			name: COMPANY.name,
			excludes: ["verification"],
		},
	],
	[
		{
			id: PERSON.name,
			fields: PERSON.fields,
			name: PERSON.name,
			excludes: ["address", "verification"],
		},
	],
	[
		{
			id: PERSON.name,
			fields: PERSON.fields,
			name: PERSON.name,
			exclusif: ["address"],
		},
	],
	[
		{
			id: PERSON.name,
			fields: PERSON.fields,
			name: PERSON.name,
			exclusif: ["verification"],
		},
	],
	[
		{
			sectionReview: true,
			id: PERSON.name,
			fields: PERSON.fields,
			section: PERSON,
			name: PERSON.name,
			excludes: ["verification"],
		},
	],
	[
		{
			id: EXTERNAL_ACCOUNT.name,
			fields: EXTERNAL_ACCOUNT.fields,
			name: EXTERNAL_ACCOUNT.name,
		},
	],
	[
		{
			sectionReview: true,
			id: EXTERNAL_ACCOUNT.name,
			fields: EXTERNAL_ACCOUNT.fields,
			section: EXTERNAL_ACCOUNT,
			name: EXTERNAL_ACCOUNT.name,
			excludes: ["verification"],
			excludesFields: ["confirm"],
		},
	],
];
const INDIVIDUAL_FORM_PAGES = [
	[
		{
			id: INDIVIDUAL.name,
			fields: INDIVIDUAL.fields,
			name: INDIVIDUAL.name,
			exclusif: ["last_name", "first_name", "phone", "email", "dob"],
		},
	],
	[
		{
			id: INDIVIDUAL.name,
			fields: INDIVIDUAL.fields,
			name: INDIVIDUAL.name,
			exclusif: ["address"],
		},
	],
	[
		{
			id: INDIVIDUAL.name,
			fields: INDIVIDUAL.fields,
			name: INDIVIDUAL.name,
			exclusif: ["verification"],
		},
	],
	[
		{
			id: EXTERNAL_ACCOUNT.name,
			fields: EXTERNAL_ACCOUNT.fields,
			name: EXTERNAL_ACCOUNT.name,
		},
	],
];
const COMPANY_FORM_PAGES = {
	company: {
		index: 0,
		pages: [
			[
				{
					id: COMPANY.name,
					fields: COMPANY.fields,
					name: COMPANY.name,
					excludes: ["address", "verification"],
				},
			],
			[
				{
					id: COMPANY.name,
					fields: COMPANY.fields,
					name: COMPANY.name,
					exclusif: ["address"],
				},
			],
		],
	},
};
const errase = {
	company: [
		[
			{
				id: COMPANY.name,
				fields: COMPANY.fields,
				name: COMPANY.name,
				excludes: ["address", "verification"],
			},
		],
		[
			{
				id: COMPANY.name,
				fields: COMPANY.fields,
				name: COMPANY.name,
				exclusif: ["address"],
			},
		],
		[
			{
				id: COMPANY.name,
				fields: COMPANY.fields,
				name: COMPANY.name,
				exclusif: ["verification"],
			},
		],
		[
			{
				sectionReview: true,
				id: COMPANY.name,
				fields: COMPANY.fields,
				section: COMPANY,
				name: COMPANY.name,
				excludes: ["verification"],
			},
		],
	],
	person: [
		[
			{
				id: PERSON.name,
				fields: PERSON.fields,
				name: PERSON.name,
				excludes: ["address", "verification"],
			},
		],
		[
			{
				id: PERSON.name,
				fields: PERSON.fields,
				name: PERSON.name,
				exclusif: ["address"],
			},
		],
		[
			{
				id: PERSON.name,
				fields: PERSON.fields,
				name: PERSON.name,
				exclusif: ["verification"],
			},
		],
		[
			{
				sectionReview: true,
				id: PERSON.name,
				fields: PERSON.fields,
				section: PERSON,
				name: PERSON.name,
				excludes: ["verification"],
			},
		],
	],
	external_account: [
		[
			{
				id: EXTERNAL_ACCOUNT.name,
				fields: EXTERNAL_ACCOUNT.fields,
				name: EXTERNAL_ACCOUNT.name,
			},
		],
		[
			{
				sectionReview: true,
				id: EXTERNAL_ACCOUNT.name,
				fields: EXTERNAL_ACCOUNT.fields,
				section: EXTERNAL_ACCOUNT,
				name: EXTERNAL_ACCOUNT.name,
				excludes: ["verification"],
				excludesFields: ["confirm"],
			},
		],
	],
};

export {
	COMPANY,
	ACCOUNT_TYPE,
	COMPANY_INFOS_FIELDS,
	BUSINESS_PROFILE,
	EXTERNAL_ACCOUNT,
	PERSON,
	COMPANY_FORM_PAGES,
	INDIVIDUAL_FORM_PAGES,
};
