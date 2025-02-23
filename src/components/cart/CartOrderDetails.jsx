import "./componentCartStyles.css";
import SubHeading1 from "../SubHeading1";
import CartProductLine from "./CartProductLine";
import WaterfallEffect from "../animation/WaterFallEffect";

export default function CartOrderDetails() {
  return (
    <div className="order-details">
      <WaterfallEffect>
        <div
          className="coupon"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h1
            style={{
              marginTop: "0vw",
              marginBottom: "1vw",
              padding: "0",
              fontSize: "1.8vw",
            }}
          >
            Calculated Shipping
          </h1>
          <input
            type="text"
            id="coupon"
            name="coupon"
            className="cart-input"
            placeholder="Country"
          />
          <div
            style={{ display: "flex", justifyContent: "center", gap: "1vw" }}
          >
            <input
              type="text"
              id="coupon"
              name="coupon"
              className="cart-input"
              placeholder="State / City"
              style={{ width: "8vw", marginTop: "1vw" }}
            />
            <input
              type="text"
              id="coupon"
              name="coupon"
              className="cart-input"
              placeholder="Zip Code"
              style={{ width: "8vw", marginTop: "1vw" }}
            />
          </div>
          <div className="coupon-apply">
            <h2
              style={{
                marginTop: "0vw",
                marginBottom: "0vw",
                padding: "0.5",
                fontSize: "1.3vw",
              }}
            >
              Update
            </h2>
          </div>
          <div className="seperator"></div>
        </div>
      </WaterfallEffect>
      <WaterfallEffect>
        <div
          className="coupon"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h1
            style={{
              marginTop: "0vw",
              marginBottom: "0vw",
              padding: "0",
              fontSize: "1.7vw",
            }}
          >
            Coupon Code
          </h1>
          <h3
            style={{
              marginTop: "0vw",
              marginBottom: "2vw",
              fontWeight: "500",
              fontSize: "1.3vw",
            }}
          >
            Feel free to apply the coupon
          </h3>
          <input
            type="text"
            id="coupon"
            name="coupon"
            className="cart-input"
            placeholder="coupon code"
          />
          <div className="coupon-apply">
            <h2
              style={{
                marginTop: "0vw",
                marginBottom: "0vw",
                padding: "0.5",
                fontSize: "1.3vw",
              }}
            >
              Apply
            </h2>
          </div>
          <div className="seperator"></div>
        </div>
      </WaterfallEffect>
      <WaterfallEffect>
        <div className="order-summary">
          <p className="order-heading">Cart Total</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="order-sub-heading">Cart Subtotal</p>
            <p className="order-sub-heading">$2099 </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="order-sub-heading">Design by ShopVerse</p>
            <p className="order-sub-heading">Free</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="order-sub-heading">Discount</p>
            <p className="order-sub-heading" style={{ color: "white" }}>
              10%
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p
              className="order-sub-heading"
              style={{ fontSize: "1.1vw", color: "black" }}
            >
              Cart Total
            </p>
            <p
              className="order-sub-heading"
              style={{ fontWeight: "800", fontSize: "1.1vw", color: "black" }}
            >
              $102192
            </p>
          </div>
        </div>
      </WaterfallEffect>
    </div>
  );
}
