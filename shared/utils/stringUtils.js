export const urlRelativePath = (url) => {
	return url.replace(/^(?:\/\/|[^/]+)*\//, "");
};
