import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/App.css";
import Products from "./Components/Products/Products";
import ErrorPage from "./Components/Errors/ErrorPage";
import Welcome from "./Components/Welcome/Welcome";
import Footer from "./Components/Footer/Footer";
import ShoppingBasket from "./Components/ShoppingBasket/ShoppingBasket";
import Checkout from "./Components/Checkout/Checkout";
import MainNavigation from "./Components/Navigation/MainNavigation";

function App() {
  const location = useLocation();

  return (
    <>
      <div>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shopping-basket" element={<ShoppingBasket />} />
          <Route path="/checkout" element={<Checkout />} />
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
