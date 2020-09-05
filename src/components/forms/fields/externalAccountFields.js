const EXTERNAL_ACCOUNT_FIELDS = [
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
];

export default EXTERNAL_ACCOUNT_FIELDS;
