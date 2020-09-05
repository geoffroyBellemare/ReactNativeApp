const PERSONAL_INFOS_FIELDS = [
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
		label: "First Name:",
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
		label: "Email:",
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
			placeholder: "Please enter yours here!!",
			returnKeyType: "next",
		},
	},
	{
		label: "Last Name:",
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
		label: "Date of Birth:",
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
		label: "Location :",
		name: "line1",
		inputProps: {
			autoCorrect: false,
			autoCapitalize: "none",
			keyboardType: "default",
			placeholder: "rue du robex...",
			returnKeyType: "next",
		},
	},
	{
		label: "City :",
		name: "city",
		inputProps: {
			autoCorrect: false,
			autoCapitalize: "none",
			keyboardType: "default",
			placeholder: "Paris...",
			returnKeyType: "next",
		},
	},
	{
		label: "Region :",
		name: "state",
		inputProps: {
			autoCorrect: false,
			autoCapitalize: "none",
			keyboardType: "default",
			placeholder: "rue du robex...",
			returnKeyType: "next",
		},
	},
	{
		label: "PostCode :",
		name: "postal_code",
		inputProps: {
			autoCorrect: false,
			autoCapitalize: "none",
			keyboardType: "default",
			placeholder: "rue du robex...",
			returnKeyType: "next",
		},
	},
];

export default PERSONAL_INFOS_FIELDS;
