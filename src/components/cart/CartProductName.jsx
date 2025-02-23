import "./componentCartStyles.css";
export default function CartProductName(props) {
  return (
    <p className="cart-product-name" style={props.style}>
      {props.value == null ? "Cotton Shirt" : props.value}
    </p>
  );
}
