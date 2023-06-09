import ErrorPage from "../Errors/ErrorPage";
import Spinner from "../Spinner/Spinner";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div>
      {error && (
        <ErrorPage
          error={`Oops - ${error}`}
          errorBody={`Sorry, there was an fetching the resource`}
        />
      )}
      {isLoading && <Spinner />}
      {products && <ProductList products={products} />}
    </div>
  );
}
export default Products;
