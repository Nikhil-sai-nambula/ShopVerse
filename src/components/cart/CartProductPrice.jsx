export default function (props) {
  let price = 2999;
  if (props.price) {
    price = parseInt(props.price);
  }

  return (
    <p className="cart-product-price" style={props.style}>
      {"₹" + price}
    </p>
  );
}
