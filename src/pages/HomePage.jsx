import React, { useState } from "react";
import "./pageStyles.css";
import { useEffect } from "react";
import Footer from "../components/footer/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import "./authPageStyles.css";
import WaterfallEffect from "../components/animation/WaterFallEffect";
import { Box, Button, Modal, Typography } from "@mui/material";
import BlurText from "../components/core/BlurText";
import AccountMenu from "../components/profile/AccountMenu";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function GenericModal({ open, onClose, children, sx }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, ...sx }}>{children}</Box>
    </Modal>
  );
}

export default function () {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isFixed, setIsFixed] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [parentOpen, setParentOpen] = React.useState(false);
  const [childOpen, setChildOpen] = React.useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;
      await fetch(`${apiUrl}/products/getAllProducts`);
    };

    fetchData();
  }, []);

  return (
    <div className="homePage">
      <>
        <GenericModal
          open={parentOpen}
          onClose={() => setParentOpen(false)}
          sx={{ bgcolor: "white", width: "auto" }}
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
            ShopVerse
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
            Your Ultimate Shopping Destination - Where Quality Meets
            Convenience!
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0vw", sm: "2vw", lg: "1vw" },
              color: "black",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
          >
            Discover the finest products, curated for an exceptional shopping
            experience.
          </Typography>
          <Button
            sx={{
              display: "flex",
              justifySelf: "center",
              width: "auto",
              bgcolor: "black",
              color: "white",
              marginTop: "2vw",
            }}
            onClick={() => setChildOpen(true)}
          >
            More Info
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

          <Typography
            sx={{
              fontSize: { xs: "2vw", sm: "2vw", lg: "0.7vw" },
              color: "black",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
              marginTop: "2vw",
            }}
          >
            Note: Backend is running on free instance so first request might
            take a minute, kindly wait.
          </Typography>
        </GenericModal>
      </>

      <div className={`app-bar ${isFixed ? "fixed" : "relative"}`} id="appBar">
        <div className="app-bar-heading">
          <Typography
            sx={{
              fontSize: { xs: "4vw", sm: "4vw", lg: "2.53vw" },
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
            onClick={() => setParentOpen(true)}
          >
            About
          </Typography>
          {!user && (
            <Typography
              sx={{
                fontSize: { xs: "3vw", sm: "2vw", lg: "1.4vw" },
                color: "white",
                cursor: "pointer",
                fontFamily: "Merriweather, serif",
              }}
              onClick={() => navigate("/login")}
            >
              SignIn
            </Typography>
          )}
          {user && <AccountMenu />}
        </div>
      </div>

      <div className="homePage1">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BlurText
            text="Welcome to ShopVerse "
            delay={150}
            animateBy="words"
            direction="top"
            className="customBlurText"
            style={{
              fontSize: "2.5vw",
              color: "white",
              fontWeight: "bold",
              fontFamily: "Merriweather,serif",
              marginTop: "20vw",
              zIndex: 1,
            }}
          />
          <BlurText
            text="Experience the Experience"
            delay={150}
            animateBy="words"
            direction="top"
            className="customBlurText"
            style={{
              fontSize: "2vw",
              color: "white",
              fontWeight: "bold",
              fontFamily: "Merriweather,serif",
              zIndex: 1,
            }}
          />
        </div>
        <Button
          sx={{
            display: "flex",
            justifySelf: "center",
            alignSelf: "center",
            width: "auto",
            fontFamily: "Merriweather,serif",
            padding: { xs: "1vw", lg: "0.7vw" },
            marginTop: { xs: "3vw", lg: "2vw" },
            borderRadius: { xs: "5vw", lg: "2vw" },
            fontSize: { xs: "2vw", lg: "0.8vw" },
            fontWeight: { lg: 600 },
            color: "black",
            backgroundColor: "white",
            ":hover": {
              backgroundColor: "#d4af37",
            },
          }}
          onClick={() => navigate("/products")}
        >
          Shop now
        </Button>
      </div>
      <WaterfallEffect>
        <Footer />
      </WaterfallEffect>
    </div>
  );
}
