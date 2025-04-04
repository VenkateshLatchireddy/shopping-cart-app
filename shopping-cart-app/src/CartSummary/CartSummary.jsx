import React from "react";
import "./CartSummary.css";

function ProgressBar({ subtotal, threshold }) {
  const progress = Math.min((subtotal / threshold) * 100, 100);
  const remaining = threshold - subtotal;
  let message = `Add ₹${remaining} more to get a FREE Wireless Mouse!`;

  if (remaining <= 0) {
    message = "You got a FREE Wireless Mouse!";
  }

  return (
    <div className="progress-wrapper">
      <h1 className="cart-summary-heading">Cart Summary</h1>
      <div className="progress-bar-container">
        <div className="subtotal-row">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        <hr style={{width:"100%"}} />
        <div className="progressbar-container">
          <p className="remaining-amount">{message}</p>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
