export default class ShoppingBasketItem {
    constructor(id, name, price, quantity) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
    }

    getQuantity() {
      return quantity;
    }

    setQuantity(quantity) {
      this.quantity = quantity;
    }
  }
  