import ProductList from "../Products/ProductList";
import ErrorPage from "../Errors/ErrorPage";

function ShoppingBasket() {
  
  const basketItems = JSON.parse(localStorage.getItem("basketItems"));
  const basketItemsArray = Object.values(basketItems || {}); // Convert object to array

  const basketContentsLength = basketItemsArray.length;

  return (
    <>
    { basketContentsLength > 0 ? (
      <ProductList products={basketItemsArray} />
    ) : (
      <ErrorPage error={`Empty Basket`} errorBody={`Basket is currently empty`} />
    )}
    </>
  );
}

export default ShoppingBasket;
