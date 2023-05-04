import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/App.css";
import Products from "./Components/Products/Products";
import NotFound from "./Components/Errors/NotFound";
import Welcome from "./Components/Welcome/Welcome";
import Footer from "./Components/Footer/Footer";
import ShoppingBasket from "./Components/ShoppingBasket/ShoppingBasket";

function App() {
  const location = useLocation();

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shopping-basket" element={<ShoppingBasket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
