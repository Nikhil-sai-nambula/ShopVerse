import CartProductName from "./CartProductName";

export default function () {
  return (
    <div className="cart-product-headings">
      <CartProductName
        value={"Product"}
        style={{ marginLeft: "2vw", marginRight: "15vw" }}
      />
      <CartProductName value={"Price"} />
      <CartProductName value={"Quantity"} />
      <CartProductName value={"TotalPrice"} />
    </div>
  );
}
