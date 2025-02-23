import { useState } from "react";
import "./pageStyles.css";
import { useEffect } from "react";
import Footer from "../components/footer/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import "./authPageStyles.css";
import WaterfallEffect from "../components/animation/WaterFallEffect";
import { Typography } from "@mui/material";

export default function () {
  const [isFixed, setIsFixed] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const appBarOffSet = document.getElementById("appBar").offsetTop;
      if (window.scrollY > appBarOffSet) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="homePage">
      <div className={`app-bar ${isFixed ? "fixed" : "relative"}`} id="appBar">
        <div className="app-bar-heading">
          <Typography
            sx={{
              fontSize: { xs: "5vw", sm: "4vw", lg: "2.53vw" },
              color: "white",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
            onClick={() => navigate("/")}
          >
            ShopVerse
          </Typography>
        </div>
        <div className="app-bar-components">
          <Typography
            sx={{
              fontSize: { xs: "3vw", sm: "2vw", lg: "1.4vw" },
              color: "white",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
            onClick={() => navigate("/products")}
          >
            Products
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "3vw", sm: "2vw", lg: "1.4vw" },
              color: "white",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
          >
            About
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "3vw", sm: "2vw", lg: "1.4vw" },
              color: "white",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
            onClick={() => navigate("/register")}
          >
            SignIn
          </Typography>
        </div>
      </div>

      <div className="homePage1"></div>
      <WaterfallEffect>
        <Footer />
      </WaterfallEffect>
    </div>
  );
}
