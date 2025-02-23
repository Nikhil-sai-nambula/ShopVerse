export default function (props) {
  return (
    <p className="product-one-liner" style={props?.style}>
      {props.value == null ? "Made with 100% pure cotten" : props.value}
    </p>
  );
}
