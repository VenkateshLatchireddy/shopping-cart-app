import React, { useEffect, useState } from "react";
import "./Cart.css";

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 21000;

function Cart({ cart, setCart }) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasUnlockedGift, setHasUnlockedGift] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (subtotal >= THRESHOLD && !cart.find((item) => item.id === FREE_GIFT.id)) {
      setCart((prevCart) => [...prevCart, { ...FREE_GIFT, quantity: 1 }]);
    
      if (!hasUnlockedGift) {
        setShowPopup(true);
        setHasUnlockedGift(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } else if (subtotal < THRESHOLD) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== FREE_GIFT.id));
      setHasUnlockedGift(false); 
    }
  }, [subtotal,cart, setCart, hasUnlockedGift]);

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0 || item.id === FREE_GIFT.id)
    );
  };

  return (
    <div className="cart-wrapper">
      <h1 className="cart-heading">Shopping Cart</h1>
      <div className="cart-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <p>Add some products to see them here!</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-left">
                <span className="item-name">{item.name}</span>
                <span className="item-price">
                  ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                </span>
              </div>
              <div className="cart-item-right">
                {item.id !== FREE_GIFT.id && (
                  <>
                    <button className="quantity-btn minus" onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button className="quantity-btn plus" onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </>
                )}
                {item.id === FREE_GIFT.id && <span className="free-gift-text">🎁 Free Gift</span>}
              </div>
            </div>
          ))
        )}
      </div>
      {showPopup && <div className="popup show">🎉 You unlocked a FREE Wireless Mouse! 🎁</div>}
    </div>
  );
}

export default Cart;
