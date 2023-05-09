import ProductList from "../Products/ProductList";

function ShoppingBasket() {
  const basketItems = JSON.parse(localStorage.getItem("basketItems"));
  const basketItemsArray = Object.values(basketItems || {}); // Convert object to array
  return (
    <>
      <ProductList products={basketItemsArray} />
    </>
  );
}

export default ShoppingBasket;
