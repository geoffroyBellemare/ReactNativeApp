class User {
	constructor(
		id,
		username,
		email,
		password,
		imageProfile,
		cart,
		company = null
	) {
		this.id = id;
		this.username = username;
		this.name = username;
		this.password = password;
		this.retypePassword = password;
		this.email = email;
		this.imageProfile = imageProfile;
		this.cart = cart;
		this.company = company;
	}
}
export default User;
