import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductName from "../components/product/ProductName";
import ProductOneLiner from "../components/product/ProductOneLiner";
import RatingInfo from "../components/RatingInfo";
import { Button } from "@mui/material";
import axios from "axios";

export default function ViewIndvProducts(props) {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [product, setProduct] = useState(props.product || []);
  const user = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleProductClick = () => {
    navigate(`/product/${props.product.id}`, { state: { product } });
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [user]);

  const handleDelete = async (productId) => {
    if (user) {
      try {
        const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;

        const response = await axios.delete(
          `${apiUrl}/seller/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("product Deleted Successfully");
        }
      } catch (errors) {
        console.log("Error removing items", errors);
      }
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImage(0);
  };

  useEffect(() => {
    if (isHovering && props?.url?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prevImg) => (prevImg + 1) % props?.url?.length);
      }, 1000);
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
      className="indv-product-card seller-prod"
      style={{ cursor: "pointer", zIndex: 9999 }}
      onClick={() => handleProductClick()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-container">
        <Slider {...slickSettings}>
          {props?.url?.map((image, index) => (
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
      <ProductName style={{ marginLeft: "0.5vw" }} value={product.name} />
      <ProductOneLiner style={{ marginLeft: "0.5vw" }} />
      <div className="price" style={{ display: "flex" }}>
        <ProductOneLiner
          value={product?.price ? `₹${product.price}` : "Rs 1000"}
          style={{ marginBotton: "0.5vw", marginLeft: "0.7vw" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="standard"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "black",
            height: { xs: "6vh", sm: "5vh", md: "4vh", lg: "3vh", xl: "2.5vh" },
            padding: { xs: "1vw", sm: "1vw", md: "2vw", lg: "1vw" },
            fontSize: { xs: "2vw", sm: "2vw", md: "2vw", lg: "1vw" },
            margin: { xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1vw" },
            width: "auto",
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate("/updateProduct", { state: { product: product } });
          }}
        >
          Update
        </Button>

        <Button
          variant="standard"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(product.id);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "black",
            height: { xs: "6vh", sm: "5vh", md: "4vh", lg: "3vh", xl: "2.5vh" },
            padding: { xs: "1vw", sm: "1vw", md: "2vw", lg: "1vw" },
            fontSize: { xs: "2vw", sm: "2vw", md: "2vw", lg: "1vw" },
            margin: { xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1vw" },
            width: "auto",
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
