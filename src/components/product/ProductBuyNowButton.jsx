import React from "react";
import styled from "styled-components";

const ProductBuyNowButton = () => {
  const handleBuyNow = () => {
    alert("Proceeding to Checkout!");
  };

  return (
    <StyledBuyNow>
      <button onClick={handleBuyNow} className="buyNowBtn">
        BUY NOW
      </button>
    </StyledBuyNow>
  );
};

const StyledBuyNow = styled.div`
  .buyNowBtn {
    margin-top: 0.3vw;
    width: 13vw;
    height: 3.5vw;
    border-radius: 2vw;
    word-spacing: 0.3vw;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: black;
    color: white;
    font-weight: 580;
    font-size: 1vw;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }

  .buyNowBtn:hover {
    background-color: #d4af37;
    transform: scale(0.9);
  }

  .buyNowBtn:active {
    transform: scale(0.95);
  }

  .cartIcon {
    fill: white;
    height: 1.5vw;
  }

  @media (max-width: 768px) {
    .buyNowBtn {
      width: 40vw;
      height: 10vw;
      font-size: 3vw;
      border-radius: 5vw;
    }

    .cartIcon {
      height: 5vw;
    }
  }
`;

export default ProductBuyNowButton;
