import { useContext, useEffect, useState } from "react";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./AccountMenu.css";
import SubHeading1 from "../SubHeading1";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const name = userData?.name;
    const email = userData?.email;

    if (email || name) {
      setUserDetails({ email, name });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("email")) setIsLoggedIn(true);
  }, [localStorage.getItem("email")]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlelogin = () => {
    navigate("/register");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAnchorEl(null);
    localStorage.removeItem("email");
    logout();
  };

  return (
    <div className="account-menu">
      <div className="account-prod-bar" onClick={handleClick}>
        <PermIdentityIcon
          sx={{ cursor: "pointer", fontSize: { sm: 30, lg: 20 } }}
        />
        <Typography
          sx={{
            fontSize: { sm: "2vw", lg: "1.2vw" },
            color: "white",
            cursor: "pointer",
            fontFamily: "Merriweather, serif",
          }}
          onClick={() => handleWishlist()}
        >
          MyAccount
        </Typography>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            marginTop: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
        <div className="menu">
          {!isLoggedin && (
            <div className="menu-items">
              <MenuItem onClick={handlelogin} className="menu-item">
                <HowToRegIcon style={{ fontSize: 24 }} />
                <p className="menu-name">SignIn/ SignUp</p>
              </MenuItem>
            </div>
          )}
          {isLoggedin && (
            <div className="avatar-info">
              <Avatar
                alt="User Avatar"
                sx={{
                  bgcolor: "#FFD700",
                  color: "black",
                }}
              >
                N
              </Avatar>
              <div className="name-email">
                <p className="name">
                  {userDetails?.name ? userDetails.name : "Nikhil Nambula"}
                </p>
                <p className="email">
                  {userDetails?.email
                    ? userDetails.email
                    : "nambula.nikhilsai@gmail.com"}
                </p>
              </div>
            </div>
          )}
          <div className="menu-items">
            <MenuItem onClick={handleClose} className="menu-item">
              <SettingsOutlinedIcon style={{ fontSize: 24 }} />
              <p className="menu-name">Settings</p>
            </MenuItem>
            <MenuItem onClick={() => navigate("/cart")} className="menu-item">
              <ShoppingCartOutlinedIcon style={{ fontSize: 24 }} />
              <p className="menu-name">Cart</p>
            </MenuItem>
            <MenuItem onClick={handleClose} className="menu-item">
              <FavoriteOutlinedIcon style={{ fontSize: 24 }} />
              <p className="menu-name">Wish List</p>
            </MenuItem>
            <MenuItem onClick={handleLogout} className="menu-item">
              <LogoutOutlinedIcon style={{ fontSize: 24 }} />
              <p className="menu-name">Log Out</p>
            </MenuItem>
          </div>
        </div>
      </Menu>
    </div>
  );
}
