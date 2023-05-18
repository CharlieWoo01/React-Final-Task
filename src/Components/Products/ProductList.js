import Card from "../Card/Card";
import { useState, useEffect } from "react";
import MainNavigation from "../Navigation/MainNavigation";

/**
 * @todo: Figure out how I can do this for shopping basket without refresh since it's a separate list to the JSON data provided (Use state related)
 * @todo: Add alert notifications
 * @todo: Add message if shopping basket empty
 * @todo: Change product overall cost to a function to neaten it up
 */
function ProductList(props) {
  const [initialStock] = useState(
    props.products.map((product) => product.UnitsInStock)
  );

  function useStateWithLocalStorage(localStorageKey, defaultValue) {
    const [value, setValue] = useState(
      localStorage.getItem(localStorageKey) || defaultValue
    );
  
    useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [localStorageKey, value]);
  
    return [value, setValue];
  }

  const [basketCount, setBasketCount] = useStateWithLocalStorage('basketCount', 0);

  const basketIncrement = () => {
    setBasketCount(prevCount => prevCount + 1);
  };

  const basketDecrease = () => {
    setBasketCount(prevCount => prevCount - 1);
  };
    
  const [stockCount, setStockCount] = useState(initialStock);

  /**
   * @todo: Integrate this as a function rather than reusing it multiple times.
   */
  // const [basketCount, setBasketCount] = useState(() => {
  //   const storedBasketItems = localStorage.getItem("basketCount");
  //   if (storedBasketItems) {
  //     return parseInt(storedBasketItems);
  //   }
  //   localStorage.setItem("basketCount", 0);
  //   return 0;
  // });

  // Function using use state to update the current basket
  /**
   * @todo: Fix this code
   */
  const [currentBasket, setCurrentBasket] = useState(() => {
    const basketItems = JSON.parse(localStorage.getItem("basketItems"));
    console.log(basketItems);
    if (basketItems) {
      // Basket is not empty then set the items
      localStorage.setItem("basketItems", JSON.stringify(basketItems));
      return basketItems;
    }
    return;
  });

  // Function to handle the change of the stock
  function handleStockChange(index) {
    setStockCount((prevCounts) => {
      const stockCount = [...prevCounts];
      stockCount[index] -= 1;
      return stockCount;
    });
  }

  /**
   * Function to add to the basket
   * @todo: Look to refactor this as it is a massive function now and fairly complex
   */
  function addToBasket(product, index, price) {
    const basketItemsArray = currentBasket ? Object.values(currentBasket) : [];
    const existingItemIndex = basketItemsArray.findIndex(
      (item) => item.id === product.id
    );

    // If in basket already then add quantity + 1
    if (existingItemIndex !== -1) {
      const updatedItems = { ...currentBasket };
      updatedItems[product.id].quantity += 1; // Add quantity if exists
      updatedItems[product.id].totalPrice += price; // Add up the total price of each product
      setCurrentBasket(updatedItems);
    }
    // If not in basket already then add it and initiate the new object and basket change
    else {
      basketIncrement(); // Increment the basket
      setCurrentBasket({
        ...currentBasket,
        [product.id]: { ...product, quantity: 1, totalPrice: price },
      });
    }

    handleStockChange(index); // Execute the stock change function
  }

  // Function to remove items from the basket
  function removeFromBasket(product, index, price) {
    const basketItemsArray = Object.values(currentBasket);
    const existingItemIndex = basketItemsArray.findIndex(
      (item) => item.id === product.id
    );

    /**
     * If in basket already and over 1 quantity, then remove quantity - 1
     * @todo Possibly add an else to throw an error if need be for extra security
     */
    const updatedItems = { ...currentBasket };
    if (existingItemIndex !== -1 && updatedItems[product.id].quantity > 1) {
      updatedItems[product.id].quantity -= 1; // Add quantity if exists
      updatedItems[product.id].totalPrice -= price; // Add up the total price of each product
      setCurrentBasket(updatedItems);
    }

    // If last item then remove it
    else if (
      existingItemIndex !== -1 &&
      updatedItems[product.id].quantity === 1
    ) {
      delete updatedItems[product.id]; // Remove the item with matching product ID
      setCurrentBasket(updatedItems);
      basketDecrease();
    }
  }

  // Function to remove all items from the basket
  function basketRemoveAll() {
    localStorage.clear();
  }

  // Block of code to add up the total cost of the items
  let basketCost = 0;
  const basketItemsArray = currentBasket ? Object.values(currentBasket) : []; // Convert object to array
  basketItemsArray.forEach((basket) => {
    basketCost += basket.totalPrice;
  });

  /**
   * @todo: Possibly look at alternatives of neating this up as a lot of inline conditionals
   */
  return (
    <>
      <MainNavigation />
      {window.location.pathname === "/shopping-basket" && basketCount > 0 && (
        <>
          <div className="remove-all-button-container">
            <button
              className="remove-all-button"
              onClick={() => basketRemoveAll()}
            >
              Remove All
            </button>
          </div>
          <div clas="remove-all-button-container">
            <p>Total Cost: £ {basketCost}.00</p>
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
                {window.location.pathname === "/products" ? (
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
                {window.location.pathname === "/products" ? (
                  <>
                    {stockCount[index] > 0 ? (
                      <button
                        className="add-basket-controls"
                        onClick={() =>
                          addToBasket(product, index, product.UnitPrice)
                        }
                      >
                        Add to basket
                      </button>
                    ) : (
                      <p style={{ color: "red" }}>Out of stock</p>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      className="shopping-basket-controls"
                      onClick={() =>
                        addToBasket(product, index, product.UnitPrice)
                      }
                    >
                      +
                    </button>
                    <button
                      className="shopping-basket-controls"
                      onClick={() =>
                        removeFromBasket(product, index, product.UnitPrice)
                      }
                    >
                      -
                    </button>
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
