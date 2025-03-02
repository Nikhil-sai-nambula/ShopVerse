import { useLocation, useNavigate, useParams } from "react-router-dom";
import RenderProductSmallImg from "../components/product/RenderProductSmallImg";
import { useEffect, useRef, useState } from "react";
import ProductMainImage from "../components/product/ProductMainImage";
import ProductCardName from "../components/product/ProductCardName";
import ProductCardOneLiner from "../components/product/ProductCardOneLiner";
import ProductCardPrice from "../components/product/ProductCardPrice";
import ProductCardRating from "../components/product/ProductCardRating";
import ProductSizeSelection from "../components/product/ProductSizeSelection";
import ProductAddToCart from "../components/product/ProductAddToCart";
import ProductDescription from "../components/product/ProductDescription";
import ProductBuyNowButton from "../components/product/ProductBuyNowButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useCart } from "../context/CartContext";

export default function () {
  const { productId } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const imageList = product.imageURL;
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState(42);
  const [selected, setSelected] = useState(false);
  const { cartProducts, addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const mainImage = imageList[currentSlide];

  const handleMainImage = (url) => {
    const newIndex = imageList.indexOf(url);
    if (newIndex !== -1 && sliderRef.current) {
      sliderRef.current.slickGoTo(newIndex);
    }
  };
  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToCart = () => {
    if (selected == false) {
      alert("please Select the size to proceed");
    } else {
      addToCart(product, size, quantity, productId);
    }
  };

  const handleSize = (selectedSize) => {
    setSelected(true);
    setSize(selectedSize);
  };

  useEffect(() => {
    console.log(size);
    console.log(cartProducts);
  }, [cartProducts, size]);

  const slickSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <div className="product-info">
      <div className="discount-bar" style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "1vw",
            color: "white",
            fontWeight: "500",
            fontFamily: "sans-serif",
          }}
        >
          2025 available now, Free shipping, exchange, & returns
        </p>
      </div>
      <div className="product-info-main">
        <div className="product-info-image-section">
          <RenderProductSmallImg
            imageList={imageList}
            onclick={(url) => handleMainImage(url)}
          />
          <div className="mobile-carousel">
            <Slider ref={sliderRef} {...slickSettings}>
              {imageList.map((img, index) => (
                <ProductMainImage url={img} key={index} />
              ))}
            </Slider>
          </div>
        </div>
        <div className="product-details">
          <ProductCardName value={product?.name} />
          <ProductCardOneLiner value={product?.oneLiner} />
          <ProductCardPrice value={product.price} />
          <ProductCardRating value={product.rating} />
          <ProductSizeSelection
            sizes={[37, 38, 39, 40, 41, 42]}
            onClick={handleSize}
          />
          <ProductAddToCart
            onQuantityChange={handleQuantityChange}
            onClickingAddToCart={handleAddToCart}
          />
          <ProductBuyNowButton />
          <p className="prod-description">{"Description"}</p>
          <ProductDescription value={product.category} />
        </div>
      </div>
    </div>
  );
}
