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
import ProductInfoExchange from "../components/product/ProductInfoExchange";
import Footer from "../components/footer/Footer";
import GenericModal from "../components/modal/GenericModal";
import { Button, Typography } from "@mui/material";

export default function () {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const product = location.state?.product;
  const imageList = product.imageURL;
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState(42);
  const [selected, setSelected] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const { cartProducts, addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

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
        <GenericModal
          open={parentOpen}
          onClose={() => setParentOpen(false)}
          sx={{ width: "auto" }}
        >
          <Typography
            sx={{
              fontSize: { xs: "4vw", sm: "2vw", lg: "1.5vw" },
              color: "#d4af37",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Hey User 👋
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "2vw", sm: "2vw", lg: "1vw" },
              color: "black",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
              textAlign: "center",
            }}
          >
            Log in to unlock seamless access to everything we offer.
          </Typography>

          <Button
            sx={{
              display: "flex",
              justifySelf: "center",
              width: "auto",
              bgcolor: "black",
              color: "white",
              marginTop: "1vw",
            }}
            onClick={() => setChildOpen(true)}
          >
            More Info
          </Button>
          <Button
            sx={{
              display: "flex",
              justifySelf: "center",
              width: "auto",
              bgcolor: "black",
              color: "white",
              marginTop: "0.5vw",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </GenericModal>

        <GenericModal
          open={childOpen}
          onClose={() => setChildOpen(false)}
          sx={{ bgcolor: "white", width: "auto" }}
        >
          <Typography
            sx={{
              fontSize: { xs: "3vw", sm: "2vw", lg: "1.3vw" },
              color: "black",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
          >
            You can test this application with following credentials
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "3vw", sm: "2vw", lg: "1vw" },
              color: "grey",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
              marginTop: "1vw",
            }}
          >
            mail : nikhil.nambula@gmail.com
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "3vw", sm: "2vw", lg: "1vw" },
              color: "grey",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
          >
            password : 123456
          </Typography>
        </GenericModal>

        <div>
          <div
            style={{
              fontSize: "1vw",
              color: "white",
              fontWeight: "500",
              fontFamily: "sans-serif",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "500",
                fontFamily: "sans-serif",
                fontSize: { xs: "2.5vw", sm: "1.5vw", lg: "1vw" },
              }}
            >
              2025 available now, Free shipping, exchange, & returns
            </Typography>
          </div>
        </div>
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
            onClickingAddToCart={() => {
              const user = JSON.parse(localStorage.getItem("user"));
              console.log(user);
              if (user && user.userId) {
                handleAddToCart();
              } else {
                setParentOpen(true);
              }
            }}
            // { handleAddToCart }
          />
          <ProductBuyNowButton />
          <p className="prod-description">{"Description"}</p>
          <ProductDescription value={product.category} />
        </div>
      </div>
      <ProductInfoExchange />
      {/* <WaterfallEffect> */}
      <Footer />
      {/* </WaterfallEffect> */}
    </div>
  );
}
