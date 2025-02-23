import { useNavigate } from "react-router-dom";
import ProductName from "./product/ProductName";
import ProductOneLiner from "./product/ProductOneLiner";
import RatingInfo from "./RatingInfo";
import { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function (props) {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const product = props.product;

  const styles = {
    icon: {
      color: "red",
      fontSize: "2rem",
      position: "absolute",
      left: "15vw",
      bottom: "10vw",
    },
    "@media (max-width: 768px)": {
      icon: {
        position: "absolute",
        fontSize: "1.5rem",
        left: "5px",
        bottom: "5px",
      },
    },
    "@media (min-width: 769px)": {
      icon: {
        fontSize: "2rem",
        left: "100vw",
        bottom: "10vw",
      },
    },
  };

  const [isFavorite, setIsFavorite] = useState(
    props?.wishListProducts?.some((item) => item?.productId === product?.id)
  );

  const handleFaviourite = (e) => {
    e.stopPropagation();

    const newFaviouriteState = !isFavorite;
    setIsFavorite(newFaviouriteState);

    if (newFaviouriteState) {
      props.addToWishList(props.product);
    } else {
      console.log(props.product);
      props.removeFromWishList(props.product.id);
    }
  };

  // useEffect(() => {
  //   if (isFavorite) {
  //     props?.addToWishList(props.product);
  //   } else {
  //     props?.removeFromWishList(props.product);
  //   }
  // }, [isFavorite]);

  const handleProductClick = () => {
    navigate(`/product/${props.product.id}`, { state: { product } });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImage(0);
  };

  useEffect(() => {
    setIsFavorite(
      props.wishListProducts?.some((item) => item?.productId === product.id)
    );
  }, [props.wishListProducts, product.id]);

  useEffect(() => {
    if (isHovering && props?.url?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prevImg) => (prevImg + 1) % props?.url?.length);
      }, 1000);
      // console.log(props.url);
      return () => clearInterval(interval);
    }
  }, [isHovering, props?.url?.length]);

  const slickSettings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
    <div
      className="indv-product-card"
      style={{ cursor: "pointer" }}
      onClick={() => handleProductClick()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-container">
        <Slider {...slickSettings}>
          {props?.url.map((image, index) => (
            <div key={index}>
              <img
                className="indv-image"
                src={isHovering ? props?.url[currentImage] : image}
                alt={`Image ${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div
        className="wishlist-icon"
        onClick={handleFaviourite}
        style={{ cursor: "pointer" }}
      >
        {isFavorite ? (
          <FavoriteIcon className="fav-icon" sx={{ fontSize: 25 }} />
        ) : (
          <FavoriteBorderIcon
            className="fav-icon"
            sx={{ fontSize: 25, color: "grey" }}
          />
        )}
      </div>
      <RatingInfo />
      <ProductName style={{ marginLeft: "0.5vw" }} value={product.name} />
      <ProductOneLiner style={{ marginLeft: "0.5vw" }} />
      <div className="price" style={{ display: "flex" }}>
        <CurrencyRupeeIcon
          sx={{
            color: "black",
            fontSize: { sm: "2vw", md: "1.1vw" },
            marginLeft: { sm: "0.4vw", md: "0.5vw" },
            marginTop: { sm: "0.4vw", md: "0.2vw" },
          }}
        />
        <ProductOneLiner
          value={product?.price ? parseInt(product?.price) : "Rs 1000"}
          style={{ marginBotton: "0.5vw" }}
        />
      </div>
    </div>
  );
}
