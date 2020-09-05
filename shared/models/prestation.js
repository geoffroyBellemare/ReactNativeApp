export default class Prestation {
	constructor(
		id,
		companyId,
		title,
		imageUrl = "",
		description = "",
		price = 0,
		quantity = 5
	) {
		this.id = id;
		this.companyId = companyId;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
	}
}
