export default function (props) {
  let price = 2999;

  if (props.value == null) {
    price = 4999;
  } else {
    price = props.value;
  }

  return (
    <div className="product-price">
      <p className="product-card-price-strike">{`${
        "₹" + Math.round(price * 1.2) + ".00"
      }`}</p>
      <p className="product-card-price">{`${
        "₹" + Math.round(price) + ".00"
      }`}</p>
    </div>
  );
}
