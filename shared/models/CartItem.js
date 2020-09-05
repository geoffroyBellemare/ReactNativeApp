class CartItem {
	constructor(id, quantity, totalAmount, prestation, checkOutSessionId = null) {
		this.cartItemId = id;
		this.quantity = quantity;
		this.prestation = prestation;
		this.totalAmount = totalAmount;
		this.checkOutSessionId = checkOutSessionId;
	}
}
export default CartItem;
