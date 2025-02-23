import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProductAddToCart = ({ onQuantityChange, onClickingAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity, onQuantityChange]);

  const handleIncrement = () => {
    if (quantity > 4) {
      setQuantity(5);
      alert("Cannot choose more that 5 items");
      return;
    }

    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      alert("Atleast Chose 1 item to buy");
    }
  };

  return (
    <StyledWrapper>
      <div className="add-to-cart">
        <div className="quantitySelector">
          <button onClick={handleDecrement} className="quantityBtn">
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button onClick={handleIncrement} className="quantityBtn">
            +
          </button>
        </div>
        <button className="cartBtn" onClick={onClickingAddToCart}>
          <svg
            className="cart"
            fill="white"
            viewBox="0 0 576 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>
          ADD TO CART
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 640 512"
            className="product"
          >
            <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .quantitySelector {
    display: flex;
    align-items: center;
    gap: 1.3vw;
    margin: 3vw 0 1vw 2.5vw;
  }

  .quantityBtn {
    width: 2vw;
    height: 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(29, 29, 29);
    color: rgb(231, 198, 90);
    border: none;
    border-radius: 50%;
    font-size: 1vw;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .quantityBtn:hover {
    background-color: #444;
  }

  .quantity {
    font-size: 1.3vw;
    font-weight: bold;
  }

  .cartBtn {
    width: 13vw;
    height: 3.5vw;
    border-radius: 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: white;
    font-weight: 500;
    position: relative;
    background-color: black;
    box-shadow: 0 20px 30px -7px rgba(27, 27, 27, 0.219);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    overflow: hidden;
    font-size: 1vw;
    margin-top: 1vw;
    border-radius: 5vw;
  }

  .cart {
    z-index: 5;
  }

  .cartBtn:active {
    transform: scale(0.96);
  }

  .product {
    position: absolute;
    width: 0.8vw;
    border-radius: 3px;
    left: 2.85vw;
    bottom: 1.5vw;
    opacity: 0;
    z-index: 1;
    fill: #d4af37;
  }

  .cartBtn:hover .cart {
    animation: slide-in-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  .cartBtn:hover .product {
    animation: slide-in-top 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .cartBtn:hover {
    transform: scale(0.95);
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-30px);
      opacity: 1;
    }

    100% {
      transform: translateY(0) rotate(-90deg);
      opacity: 1;
    }
  }

  @keyframes slide-in-left {
    0% {
      transform: translateX(-10px);
      opacity: 0;
    }

    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .quantitySelector {
      display: flex;
      align-items: center;
      gap: 4vw;
      margin: 3vw 0 3vw 0;
    }

    .quantityBtn {
      width: 8vw;
      height: 8vw;
      font-size: 3vw;
    }

    .quantity {
      font-size: 3vw;
    }

    .cart {
      width: 4vw;
      height: 4vw;
    }

    .cartBtn {
      width: 40vw;
      height: 10vw;
      font-size: 3vw;
    }

    .product {
      position: absolute;
      width: 2vw;
      border-radius: 3px;
      left: 7.5vw;
      bottom: 3.5vw;
      opacity: 0;
      z-index: 1;
      fill: #d4af37;
    }

    .add-to-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default ProductAddToCart;
