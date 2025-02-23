import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Typography } from "@mui/material";

const CartPtoductQuantity = (props) => {
  const { updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(props.value);
  const isFirstRender = useRef(true);

  const handleIncrement = () => {
    if (quantity >= 5) {
      alert("Cannot choose more that 5 items");
      return;
    }
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(props.id, newQuantity);
    localStorage.setItem("quantity", newQuantity);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(props.id, newQuantity);
      localStorage.setItem("quantity", newQuantity);
    } else {
      alert("Atleast Chose 1 item to buy");
    }
  };

  return (
    <div className="cart-quantity">
      <div className="quantitySelector">
        <button
          onClick={handleDecrement}
          className="quantityBtn quantityBtnDecrement"
        >
          -
        </button>
        {/* <span className="quantity">{quantity}</span> */}

        <Typography
          sx={{
            fontSize: { xs: "1vw", sm: "1vw" },
            color: "black",
            fontWeight: "600",
          }}
        >
          {quantity}
        </Typography>
        <button onClick={handleIncrement} className="quantityBtn">
          +
        </button>
      </div>
    </div>
  );
};

export default CartPtoductQuantity;
