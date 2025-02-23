export default function (props) {
  let price = 2999;

  if (props.value == null) {
    price = 4999;
  } else {
    price = props.value;
  }

  return (
    <div className="product-price">
      <p className="product-card-price-strike">{`${"₹" + price + ".00"}`}</p>
      <p className="product-card-price">{`${
        "₹" + Math.round(price * 0.8) + ".00"
      }`}</p>
    </div>
  );
}
