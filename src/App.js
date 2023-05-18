import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Products from "./Components/Products/Products";
import ErrorPage from "./Components/Errors/ErrorPage";
import Welcome from "./Components/Welcome/Welcome";
import Footer from "./Components/Footer/Footer";
import ShoppingBasket from "./Components/ShoppingBasket/ShoppingBasket";
import Checkout from "./Components/Checkout/Checkout";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shopping-basket" element={<ShoppingBasket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/success"
            element={
              <ErrorPage
                error={`Transaction Successful!`}
                errorBody={`Success, you have purchased the items from your basket.`}
              />
            }
          />
          <Route
            path="*"
            element={
              <ErrorPage
                error={`404 - Page Not Found`}
                errorBody={`Sorry, the page you are looking for does not exist.`}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
