export default function (props) {
  return (
    <p className="product-card-name">
      {props.value == null ? "Premium Shirt" : props.value}
    </p>
  );
}
