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
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WishListModal from "../modal/WishListModal";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [modalToBeDisplayed, setModalToBeDisplayed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

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
    navigate("/login");
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
          className="account-text"
          sx={{
            fontSize: { xs: "3vw", sm: "2vw", lg: "1.2vw" },
            color: props?.color ? props.color : "white",
            cursor: "pointer",
            fontFamily: "Merriweather, serif",
          }}
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
            marginTop: { xs: "3vw", lg: "1vw" },
            width: { xs: "50vw", sm: "30vw", lg: "20vw" },
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
                  width: { xs: 40, lg: 40 },
                  height: { xs: 40, lg: 40 },
                  fontSize: { xs: "2.5vw", lg: "1vw" },
                }}
              >
                {userDetails?.name?.charAt(0) || "N"}
              </Avatar>
              <div className="name-email">
                <p className="name text">
                  {userDetails?.name || "Nikhil Nambula"}
                </p>
                <p className="email text">
                  {userDetails?.email || "nambula.nikhilsai@gmail.com"}
                </p>
              </div>
            </div>
          )}
          <div className="menu-items">
            {user?.role === "ROLE_SELLER" && (
              <MenuItem
                onClick={() => navigate("/viewProducts")}
                className="menu-item"
                sx={{ margin: "0vw" }}
              >
                <StorefrontIcon
                  style={{ fontSize: { xs: "3vw", lg: "1.3vw" } }}
                />
                <Typography
                  className="menu-name"
                  style={{ margin: "0vw" }}
                  fontSize={{ xs: "3vw", lg: "1.2vw" }}
                >
                  Seller DashBoard
                </Typography>
              </MenuItem>
            )}
            <MenuItem
              onClick={() => navigate("/cart")}
              className="menu-item"
              sx={{ margin: "0vw" }}
            >
              <ShoppingCartOutlinedIcon style={{ fontSize: 24 }} />
              <Typography
                className="menu-name"
                style={{ margin: "0vw" }}
                fontSize={{ xs: "3vw", lg: "1.2vw" }}
              >
                Cart
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => setModalToBeDisplayed(true)}
              className="menu-item"
            >
              <FavoriteOutlinedIcon style={{ fontSize: 24 }} />
              <Typography
                className="menu-name"
                style={{ margin: "0vw" }}
                fontSize={{ xs: "3vw", lg: "1.2vw" }}
              >
                Wish List
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} className="menu-item">
              <LocalShippingOutlinedIcon style={{ fontSize: 24 }} />
              <Typography
                className="menu-name"
                style={{ margin: "0vw" }}
                fontSize={{ xs: "3vw", lg: "1.2vw" }}
              >
                Orders
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} className="menu-item">
              <SettingsOutlinedIcon style={{ fontSize: 24 }} />
              <Typography
                className="menu-name"
                style={{ margin: "0vw" }}
                fontSize={{ xs: "3vw", lg: "1.2vw" }}
              >
                Settings
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} className="menu-item">
              <LogoutOutlinedIcon style={{ fontSize: 24 }} />
              <Typography
                className="menu-name"
                style={{ margin: "0vw" }}
                fontSize={{ xs: "3vw", lg: "1.2vw" }}
              >
                Log out
              </Typography>
            </MenuItem>
          </div>
          <WishListModal
            shouldBeDisplayed={modalToBeDisplayed}
            setShouldBeDisplayed={setModalToBeDisplayed}
            wishListLoading={true}
          />
        </div>
      </Menu>
    </div>
  );
}
