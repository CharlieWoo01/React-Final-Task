import Card from "../Card/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * @todo: Figure out how I can do this for shopping basket without refresh since it's a separate list to the JSON data provided (Use state related)
 * @todo: Optimise the styles as some can be reused elsewhere
 */
function ProductList(props) {
  const [initialStock] = useState(
    props.products.map((product) => product.UnitsInStock)
  );

  /**
   * Custom function to have use localStorage as useState
   */
  function useStateWithLocalStorage(localStorageKey, defaultValue) {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(localStorageKey);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
      if (value === null) {
        localStorage.removeItem(localStorageKey);
      } else {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
      }
    }, [localStorageKey, value]);

    return [value, setValue];
  }

  // Initialise useState of basketCount and setter
  const [basketCount, setBasketCount] = useStateWithLocalStorage(
    "basketCount",
    0
  );

  // Add one to the basket count
  const basketIncrement = () => {
    setBasketCount((prevCount) => prevCount + 1);
  };

  // Remove one from the basket count
  const basketDecrease = () => {
    setBasketCount((prevCount) => prevCount - 1);
  };

  // Initialise useState of stockCount and setter
  const [stockCount, setStockCount] = useState(initialStock);

  // Initialise useState of currentBasket and setter
  const [currentBasket, setCurrentBasket] = useStateWithLocalStorage(
    "basketItems",
    null
  );

  // Handle the change of the stock
  const handleStockChange = (index) => {
    setStockCount((prevCounts) => {
      const stockCount = [...prevCounts];
      stockCount[index] -= 1;
      return stockCount;
    });
  };

  // Find if the existing product exists in the basket
  const basketProductsExists = (product) => {
    const basketItemsArray = currentBasket ? Object.values(currentBasket) : [];
    const existingItemIndex = basketItemsArray.findIndex(
      (item) => item.id === product.id
    );
    return existingItemIndex;
  };

  // Add to the basket handler
  const addToBasket = (product, index, price) => {
    // If the product exists then will increment the quantity and price within basket
    if (basketProductsExists(product) !== -1) {
      const updatedItems = { ...currentBasket };
      updatedItems[product.id].quantity += 1;
      updatedItems[product.id].totalPrice += price;
      setCurrentBasket(updatedItems);
    }
    // If not in basket already then add it and initiate the new object and increment the basket
    else {
      setCurrentBasket({
        ...currentBasket,
        [product.id]: { ...product, quantity: 1, totalPrice: price },
      });
      basketIncrement();
    }

    // Change the stock (This will reset everytime the page is refreshed/landed on)
    handleStockChange(index);
  };

  // Remove items from the basket
  const removeFromBasket = (product, price) => {
    const updatedItems = { ...currentBasket };
    const existingItemIndex = basketProductsExists(product);

    // If in basket already and over 1 quantity, then remove quantity - 1 and update price
    if (existingItemIndex !== -1 && updatedItems[product.id].quantity > 1) {
      updatedItems[product.id].quantity -= 1;
      updatedItems[product.id].totalPrice -= price;
      setCurrentBasket(updatedItems);
    }

    // If last item then remove the product and update the basket count
    else if (
      existingItemIndex !== -1 &&
      updatedItems[product.id].quantity === 1
    ) {
      delete updatedItems[product.id];
      setCurrentBasket(updatedItems);
      basketDecrease();
    }
  };

  // Remove all items from the basket
  const basketRemoveAll = () => {
    localStorage.clear();
  };

  // Block of code to add up the total cost of the items
  let basketCost = 0;
  const basketItemsArray = currentBasket ? Object.values(currentBasket) : []; // Convert object to array
  basketItemsArray.forEach((basket) => {
    basketCost += basket.totalPrice;
  });

  // Used for conditional rendering
  const isShoppingBasketPage = window.location.pathname === "/shopping-basket";
  const isProductsPage = window.location.pathname === "/products";

  return (
    <>
      {isShoppingBasketPage && basketCount > 0 && (
        <>
          <div className="remove-all-button-container">
            <div className="total-cost">
              <p>Total Cost: £ {basketCost}.00</p>
            </div>

            <button className="remove-all-button" onClick={basketRemoveAll}>
              Remove All
            </button>

            <Link to="/checkout" className="purchase-button">
              Checkout
            </Link>
          </div>
        </>
      )}
      {props.products.map((product, index) => (
        <div key={product.id} className="card-container">
          <Card>
            <div className="card-header">
              <h2>{product.ProductName}</h2>
            </div>
            <div className="card-body">
              <div className="card-information">
                {isProductsPage ? (
                  <>
                    <p>Price: £{product.UnitPrice}</p>
                    <p>Stock: {stockCount[index]}</p>
                  </>
                ) : (
                  <>
                    <p>Total Price: £{product.totalPrice}</p>
                    <p>Quantity: {product.quantity}</p>
                  </>
                )}
              </div>
              <div className="button-container">
                {isProductsPage && stockCount[index] > 0 ? (
                  <button
                    className="add-basket-controls"
                    onClick={() =>
                      addToBasket(product, index, product.UnitPrice)
                    }
                  >
                    Add to basket
                  </button>
                ) : (
                  isProductsPage && <p style={{ color: "red" }}>Out of stock</p>
                )}
                {!isProductsPage && (
                  <>
                    <button
                      className="shopping-basket-controls control-add"
                      onClick={() =>
                        addToBasket(product, index, product.UnitPrice)
                      }
                    ></button>
                    <button
                      className="shopping-basket-controls control-remove"
                      onClick={() =>
                        removeFromBasket(product, product.UnitPrice)
                      }
                    ></button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
}

export default ProductList;
