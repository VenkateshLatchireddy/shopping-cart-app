import React from "react";
import "./Products.css";

function ProductList({ products, cart, setCart }) {
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="product-list-wrapper">
      <h1 className="products-heading">Products</h1>
      <div className="product-list">
        <div className="products-container">
          {products.map((product) => (
            <div key={product.id} className="product">
              <div>
                <h1>{product.name}</h1>
                <p>Price: ₹{product.price}</p>
              </div>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
