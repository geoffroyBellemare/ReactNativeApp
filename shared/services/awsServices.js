import AWS from "aws-sdk";

AWS.config.update({
	region: "eu-west-2",
	credentials: new AWS.CognitoIdentityCredentials({
		IdentityPoolId: "eu-west-2:e43d91c2-d52c-4afa-9d8c-c5a38ed4cfe3",
	}),
});

const upload = async (file, presignUrl) => {
	let params = {
		Bucket: "slideguide2",
		Key: presignUrl,
	};
	try {
		if (typeof file !== "object") {
			const response = await fetch(file);
			const blob = await response.blob();
			params.Body = blob;
		} else {
			params.Body = file[0];
		}
		const res = await new AWS.S3.ManagedUpload({
			params,
		}).promise();
		return res;
	} catch (e) {
		throw e;
	}
};

export { upload };
