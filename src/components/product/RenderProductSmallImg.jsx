import ProductSmallImage from "./ProductSmallImage";
import "./componentStylesProduct.css";

export default function (props) {
  return (
    <div className="small-image-container">
      {props.imageList.map((image) => (
        <ProductSmallImage
          url={image}
          key={image}
          onclick={() => props.onclick(image)}
        />
      ))}
    </div>
  );
}
