import MainNavigation from "../Navigation/MainNavigation";
import ProductList from "../Products/ProductList";
import { useLocation } from "react-router-dom";

function ShoppingBasket() {
  const location = useLocation();
  const basket = location.state?.basketProducts;
  console.log(location.state);
  return (
    <>
      <MainNavigation />
      {/* { <ProductList products={basket} /> */}
    </>
  );
}

export default ShoppingBasket;
