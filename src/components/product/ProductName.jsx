export default function (props) {
  return (
    <p className="product-name" style={props?.style}>
      {props.value == null ? "Premium Shirt" : props.value}
    </p>
  );
}
