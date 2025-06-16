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
import _ from "lodash";

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
  const [open, setOpen] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);

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
      await fetch(`${apiUrl}m/products/getAllProducts`);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      // update minimal state here
    }, 100); // using lodash throttle

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Button
            sx={{
              animation: "float 2s ease-in-out infinite",

              width: "fit-content",
              minWidth: "unset",
              fontFamily: "Merriweather,serif",
              padding: { xs: "1vw", lg: "0.7vw" },
              paddingLeft: { xs: "2vw", lg: "1vw" },
              borderRadius: { xs: "5vw", lg: "2vw" },
              fontSize: { xs: "3vw", lg: "0.8vw" },
              fontWeight: { lg: 600 },
              color: "white",
              backgroundColor: "transparent",
              border: "1px solid white",
              // ":hover": {
              //   backgroundColor: "grey",
              // },
            }}
            onClick={() => navigate("/products")}
          >
            Shop now !
          </Button>
        </Box>
      </div>
      <WaterfallEffect>
        <Footer />
      </WaterfallEffect>
    </div>
  );
}
