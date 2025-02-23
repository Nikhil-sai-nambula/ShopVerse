export default function (props) {
  return (
    <div className="product-main-image" key={props?.key}>
      <img
        className="main-image"
        src={props.url}
        alt="Clothing Main image"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
