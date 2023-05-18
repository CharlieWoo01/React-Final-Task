import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // I know it is bad practice but there is a lot of imports here
import "./Checkout.css";
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const redirectUser = useNavigate();

  // Define the form schema for the validation
  const formValidation = yup.object().shape({
    cardNumber: yup
      .string()
      .matches(
        /^\d+$/,
        "Card number must be a numeric value and contain no spaces"
      )
      .min(8, "Card number must be between 8 and 19 digits")
      .max(19, "Card number must be between 8 and 19 digits")
      .required("Card number is required"),
    cardName: yup.string().required("Cardholder name is required"),
  });

  // Define React Hook forms and yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidation),
  });

  // Sneaky way of refreshing the page as same issue as before lol
  const onSubmit = () => {
    localStorage.clear();
    redirectUser("/success");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="purchase-form">
        <div className="form-group">
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            className="form-input"
            {...register("cardNumber")} // Register the input with react-hook-form
          />
          {errors.cardNumber && (
            <p className="error-message">{errors.cardNumber.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="card-name">Cardholder Name:</label>
          <input
            type="text"
            id="card-name"
            className="form-input"
            {...register("cardName")} // Register the input with react-hook-form
          />
          {errors.cardName && (
            <p className="error-message">{errors.cardName.message}</p>
          )}
        </div>
        <button className="form-button" type="submit">
          Complete Checkout
        </button>
      </form>
    </div>
  );
}

export default Checkout;
