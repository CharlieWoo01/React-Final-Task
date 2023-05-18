import { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");

  // Update the card number with the data in that input
  const handleCardNumberChange = (formData) => {
    setCardNumber(formData.target.value);
  };

  // Update the card name with the data in that input
  const handleCardNameChange = (formData) => {
    setCardName(formData.target.value);
  };

  // Handle the form submission
  const handleSubmit = (formData) => {
    formData.preventDefault();
    console.log("Card Number:", cardNumber);
    console.log("Card Name:", cardName);
    setCardNumber("");
    setCardName("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="purchase-form">
        <div className="form-group">
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            className="form-input"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="card-name">Cardholder Name:</label>
          <input
            type="text"
            id="card-name"
            className="form-input"
            value={cardName}
            onChange={handleCardNameChange}
            required
          />
        </div>
        <button className="form-button" type="submit">Complete Checkout</button>
      </form>
    </div>
  );
}

export default Checkout;
