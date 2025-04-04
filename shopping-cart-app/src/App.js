import React, { useState, useEffect } from "react";
import ProductList from "./Products/Products";
import Cart from "./Cart/Cart";
import ProgressBar from "./CartSummary/CartSummary";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 20000 },
  { id: 2, name: "Smartphone", price: 10000 },
  { id: 3, name: "Headphones", price: 1000 },
  { id: 4, name: "Smartwatch", price: 2000 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 21000;

function App() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const newSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  
    setCart((prevCart) => {
      const hasFreeGift = prevCart.some(item => item.id === FREE_GIFT.id);
  
      if (newSubtotal >= THRESHOLD && !hasFreeGift) {
        return [...prevCart, { ...FREE_GIFT, quantity: 1 }];
      } 
      
      if (newSubtotal < THRESHOLD && hasFreeGift) {
        return prevCart.filter(item => item.id !== FREE_GIFT.id);
      }
  
      return prevCart;
    });
  }, [cart]);
  

  return (
    <div className="app">
      <h1 style={{color:"darkred"}}>Shopping Cart</h1>
      <ProductList products={PRODUCTS} cart={cart} setCart={setCart} />
      <ProgressBar subtotal={subtotal} threshold={THRESHOLD} />
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;





