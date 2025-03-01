import { Typography } from "@mui/material";
import "./utilities.css";
import AccountMenu from "../profile/AccountMenu";
import { useNavigate } from "react-router-dom";

export default function SellerAppBar() {
  const navigate = useNavigate();
  return (
    <div className="seller-app-bar">
      <Typography
        sx={{
          fontSize: { xs: "3.8vw", sm: "3vw", lg: "2.5vw" },
          color: "white",
          cursor: "pointer",
          fontFamily: "Merriweather, serif",
        }}
        onClick={() => navigate("/products")}
      >
        ShopVerse
      </Typography>
      <AccountMenu color="white" />
    </div>
  );
}
