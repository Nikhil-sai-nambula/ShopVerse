import { useState } from "react";
import "./componentStylesProduct.css";

export default function (props) {
  const [border, setBorder] = useState(false);
  const handleEnter = () => {
    setBorder(true);
    if (props.onclick) {
      props.onclick();
    }
  };

  const handleLeave = () => {
    setBorder(false);
  };
  return (
    <div
      className={`product-small-image ${border ? "border-left" : ""}`}
      onMouseEnter={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
    >
      <img className="small-image" src={props.url} alt="clothing image" />
    </div>
  );
}
