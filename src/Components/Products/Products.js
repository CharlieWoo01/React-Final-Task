import ResourceError from "../Errors/ResourceError";
import Spinner from "../Spinner/Spinner";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [basketItems, setBasketItems] = useState([]);
  const [stockCount, setStock] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => {
        if (!res.ok) {
          throw error("Could not get data from that resource");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);





  function updateStock(newStockCount) {
    // newStockCount -= 1;
    setStock(stockCount - 1);
    console.log(stockCount);
  }
  


  // const [count, setCount] = useState(props.initialCount);

  // function handleClick() {
  //   setCount(count - 1);
  // }




  // useEffect(() => {
  //   setItemCount(basketItems.reduce((total, item) => total + item.quantity, 0));
  // }, [basketItems]);

  // const addToBasket = (product, quantity) => {
  //   if (quantity > product.UnitsInStock) {
  //     console.log("error");
  //     return;
  //   }

  //   const existingItemIndex = basketItems.findIndex(
  //     (item) => item.product.id === product.id
  //   );

  //   if (existingItemIndex > -1) {
  //     // If the item is already in the basket, update the quantity
  //     const updatedBasketItems = [...basketItems];
  //     updatedBasketItems[existingItemIndex].quantity += quantity;
  //     setBasketItems(updatedBasketItems);
  //     console.log("update quantity");
  //   } else {
  //     // If the item is not in the basket, add it as a new item
  //     const newItem = {
  //       product: product,
  //       quantity: quantity,
  //     };
  //     setBasketItems([...basketItems, newItem]);
      
  //     console.log("new item");
  //   }
  // };



  // console.log(basketItems);




  return (
    <div>
      {error && <ResourceError error={error} />}
      {isLoading && <Spinner />}
      {products && (
        <ProductList
          products={products}
          // updateStock={(stockCount) => updateStock(stockCount)}
          // addToBasket={(product, quantity) => addToBasket(product, quantity)}
          // itemCount={itemCount}
        />
      )}
    </div>
  );
}
export default Products;