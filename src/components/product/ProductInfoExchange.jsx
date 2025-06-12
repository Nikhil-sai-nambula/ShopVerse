import { RiExchangeBoxLine } from "react-icons/ri";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { RiVerifiedBadgeLine } from "react-icons/ri";

const ProductInfoExchange = () => {
  return (
    <div className="exchange-info">
      <div className="exc-info">
        <RiExchangeBoxLine />
        <p className="exc-text">Easy Exchange</p>
      </div>
      <div className="exc-info">
        <FaHandHoldingHeart />
        <p className="exc-text">100% HandPicked</p>
      </div>
      <div className="exc-info">
        <RiVerifiedBadgeLine />
        <p className="exc-text">Assured Quality</p>
      </div>
    </div>
  );
};

export default ProductInfoExchange;
