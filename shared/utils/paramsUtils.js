export const appendParams = (indexKey, params, obj) => {
	for (let key in obj) {
		if (typeof obj[key] === "object") {
			const index = `${indexKey}[${key}]`;
			appendParams(index, params, obj[key]);
		} else {
			const index = `${indexKey}[${key}]`;
			params.append(index, obj[key]);
		}
	}
};
export const getSearchParams = (key, data) => {
	let params = new URLSearchParams();
	appendParams(key, params, data);
	return params;
};
