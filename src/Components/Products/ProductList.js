import Card from "../Card/Card";
import { useState } from "react";
import MainNavigation from "../Navigation/MainNavigation";

function ProductList(props) {
  const [initialStock] = useState(
    props.products.map((product) => product.UnitsInStock)
  );

  const [stockCount, setStockCount] = useState(initialStock);

  const [basketCount, setBasketCount] = useState(0);

  function handleStockChange(index) {
    setStockCount((prevCounts) => {
      const stockCount = [...prevCounts];
      stockCount[index] -= 1;
      setBasketCount(basketCount + 1);
      return stockCount;
    });
  }

  return (
    <>
      <MainNavigation basketCount={basketCount} />
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
                <button onClick={() => handleStockChange(index)}>
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
