import Card from "../Card/Card";
import { useState } from "react";
import MainNavigation from "../Navigation/MainNavigation";

function ProductList(props) {
  const [initialStock] = useState(
    props.products.map((product) => product.UnitsInStock)
  );

  const [stockCount, setStockCount] = useState(initialStock);

  const [basketCount, setBasketCount] = useState(() => {
    const storedBasketItems = localStorage.getItem("basketCount");
    if (storedBasketItems) {
      return parseInt(storedBasketItems);
    }
    return 0;
  });

  function handleStockChange(index) {
    setStockCount((prevCounts) => {
      const stockCount = [...prevCounts];
      stockCount[index] -= 1;
      return stockCount;
    });
  }

  // Function to add to the basket
  function addToBasket(product, index) {
    const basketItems = JSON.parse(localStorage.getItem("basketItems")) || {};
    const basketItemsArray = Object.values(basketItems);
    const existingItemIndex = basketItemsArray.findIndex(
      (item) => item.id === product.id
    );

    // If in basket already then add quantity + 1
    if (existingItemIndex !== -1) {
      const updatedItems = { ...basketItems };
      updatedItems[product.id].quantity += 1;
      localStorage.setItem("basketItems", JSON.stringify(updatedItems));
    }
    // If not in basket already then add it and initiate the new object and basket change
    else {
      localStorage.setItem(
        "basketItems",
        JSON.stringify({
          ...basketItems,
          [product.id]: { ...product, quantity: 1 },
        })
      );
      setBasketCount(basketCount + 1);
      localStorage.setItem("basketCount",  basketCount + 1);
    }

    handleStockChange(index); // Execute the stock change function
  }

  //  localStorage.clear();
  return (
    <>
      <MainNavigation />
      {props.products.map((product, index) => (
        <div key={product.id} className="card-container">
          <Card>
            <div className="card-header">
              <h2>{product.ProductName}</h2>
            </div>
            <div className="card-body">
              <p>Price: £{product.UnitPrice}</p>
              <p>Stock: {stockCount[index]}</p>
            </div>
            <div className="card-footer">
              {stockCount[index] > 0 ? ( // If has stock show the button
                <button onClick={() => addToBasket(product, index, index)}>
                  Add to basket
                </button>
              ) : (
                // Else not in stock, then show a message
                <p style={{ color: "red" }}>Out of stock</p>
              )}
            </div>
          </Card>
        </div>
      ))}
    </>
  );
}

export default ProductList;
