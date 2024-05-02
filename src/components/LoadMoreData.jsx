import React, { useEffect, useState } from "react";

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=20&skip=${
            count === 0 ? 0 : count * 20
          }`
        );

        const data = await response.json();

        setProducts([...products, ...data.products]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 80) setDisabledButton(true);
  }, [products]);

  if (loading) {
    return <div className="text-center m-2">Loading data... Please wait!!</div>;
  }

  console.log(products);
  return (
    <div className="w-[90%] mx-auto">
      <h2 className="text-center text-2xl font-semibold m-5">Our Products</h2>
      <div className="flex flex-wrap gap-12 justify-center ">
        {products &&
          products.map((product, productId) => (
            <div
              key={productId}
              className="hover:-translate-y-2 transition-all ease-in-out w-80  rounded-md"
            >
              <img
                className="w-48 h-48 mx-auto my-5"
                src={product.thumbnail}
                alt=""
              />
              <h2 className="text-center font-semibold text-slate-800">
                {product.brand}
              </h2>
              <div className="flex justify-between items-center px-3 pb-5">
                <h4 className="text-slate-600">${product.price}</h4>
                <h4 className="flex gap-1 items-center text-slate-600">
                  {product.rating}⭐
                </h4>
              </div>
              <p className="text-center text-emerald-600">
                {product.stock}{" "}
                {product.stock > 1 ? "✅ In Stock" : "Out of Stock"}
              </p>

              <button className="bg-green-200 text-slate-800 w-full mx-auto py-3 mt-4">
                Add to Cart 🛒
              </button>
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-5 justify-center items-center m-5">
        <button
          disabled={disabledButton}
          className="border border-slate-400 text-slate-700 font-semibold px-4 py-1"
          onClick={() => setCount(count + 1)}
        >
          {disabledButton ? "Disabled" : "Load More Data"}
        </button>
        {disabledButton && (
          <span>You have reached the limit threshold of 80 products</span>
        )}
      </div>
    </div>
  );
};

export default LoadMoreData;
