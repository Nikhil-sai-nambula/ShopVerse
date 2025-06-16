import { useCallback, useEffect, useRef, useState } from "react";
import IndividualProductCard from "../components/IndividualProductCard";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useLocation, useNavigate } from "react-router-dom";
import AccountMenu from "../components/profile/AccountMenu";
import Skeleton from "@mui/material/Skeleton";
import WaterfallEffect from "../components/animation/WaterFallEffect";
import {
  Autocomplete,
  Button,
  Paper,
  Popper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import WishListModal from "../components/modal/WishListModal";
import ShoppingCartOutlineIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import Footer from "../components/footer/Footer";
import GenericModal from "../components/modal/GenericModal";

const CustomPopper = styled(Popper)({
  "& .MuiAutocomplete-paper": {
    backgroundColor: "#fff",
    borderRadius: "8px",
    margin: { xs: "5vw", sm: "4.5vw", lg: "0.7vw" },
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
});
const CustomPaper = (props) => (
  <Paper
    {...props}
    sx={{
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      fontSize: { xs: "2vw", sm: "1.5vw", lg: "1vw" },

      "& .MuiAutocomplete-option": {
        padding: { xs: "0vw 3vw", lg: "0.5vw 1.2vw" },
        borderBottom: "1px solid #eee",
        "&:last-child": {
          borderBottom: "none",
        },
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      },
    }}
  />
);

export default function () {
  const [isFixed, setIsFixed] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalToBeDisplayed, setModalToBeDisplayed] = useState(false);
  const location = useLocation();
  const [wishListProducts, setWishListProducts] = useState([]);
  const [wishListLoading, setWishListLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);

  const isMobile = window.innerWidth <= 768;
  const displayData = null;

  const searchableProducts = [
    "Men Shirts",
    "Men Pants",
    "Suits for Men",
    "Dresses for Women",
  ];

  const searchMap = new Map([
    ["men shirts", "M_Shirts"],
    ["men pants", "M_Pants"],
    ["suits for men", "M_Suits"],
    ["shirts", "M_Shirts"],
    ["pants", "M_Pants"],
    ["suits", "M_Suits"],
    ["dresses for women", "W_Dresses"],
  ]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data);
      return;
    }

    const normalizedQuery = searchQuery
      ? String(searchQuery).toLowerCase()
      : "";

    let filteredProducts = data.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );

    if (filteredProducts.length <= 0) {
      filteredProducts = data.filter((product) => {
        console.log(searchMap.get(searchQuery), " ", product.category);
        return product.category.includes(
          searchMap.get(searchQuery.toLowerCase())
        );
      });
    }

    if (filteredProducts.length <= 0) {
      if (
        normalizedQuery.includes("men") &&
        !normalizedQuery.includes("women")
      ) {
        filteredProducts = data.filter((product) =>
          product.category.startsWith("M_")
        );
      } else if (normalizedQuery.includes("women")) {
        filteredProducts = data.filter((product) =>
          product.category.startsWith("W_")
        );
      }
    }

    if (isMobile && filteredProducts.length % 2 !== 0) {
      setFilteredData(filteredProducts.slice(0, filteredProducts.length - 1));
    }

    setFilteredData(filteredProducts);
  }, [searchQuery, data]);

  const handleWishlist = () => {
    setModalToBeDisplayed((prev) => !prev);
  };

  useEffect(() => {
    const saveScrolledPosition = sessionStorage.getItem(
      "productsScrollPosition"
    );

    if (saveScrolledPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseFloat(saveScrolledPosition));
      }, 100);
    }
    return () => {
      sessionStorage.setItem("productsScrollPosition", window.scrollY);
    };
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;
        const response = await fetch(`${apiUrl}m/products/getAllProducts`);
        if (!response.ok) {
          throw new Error("Couldn't retrieve Data");
        }
        let result = await response.json();

        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const productBar = document.getElementById("productBar");

      if (productBar) {
        const appBarOffSet = productBar.offsetTop;

        if (window.scrollY > appBarOffSet) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(wishListProducts);
  }, [wishListProducts]);

  const fetchWishList = useCallback(async () => {
    if (user) {
      try {
        setWishListLoading(true);
        const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;
        const response = await axios.get(
          `${apiUrl}m/wishlist/get-wishlist-items/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setWishListLoading(false);
          console.log("response is ", response.data);
          setWishListProducts(response.data.products || []);
          localStorage.setItem(
            "wishList",
            JSON.stringify(response.data.products || [])
          );
        }
      } catch (errors) {
        console.log(errors);
        localStorage.removeItem("wishList");
        setWishListProducts([]);
      }
    } else {
      setWishListProducts([]);
    }
  }, [user?.userId, token]);

  const handleAddToWishList = async (product) => {
    const formattedProduct = {
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
      productOneLiner: product.oneLiner,
      imageURL: Array.isArray(product.imageURL)
        ? product.imageURL[0]
        : product.imageURL,
      price: product.price,
    };

    if (!user || !token) return;

    try {
      console.log(product);
      const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;

      const response = await axios.post(
        `${apiUrl}m/wishlist/add/${user.userId}`,
        formattedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        await fetchWishList();
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleRemoveFromWishList = async (productId) => {
    if (!user || !token) return;

    try {
      console.log(user, productId);
      const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;

      const response = await axios.delete(
        `${apiUrl}m/wishlist/remove/${user.userId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: productId,
        }
      );

      console.log(response);
      if (response.status === 200) {
        const result = response.statusText;
        if (result === "Wishlist is now empty") {
          setWishListProducts([]);
        } else {
          await fetchWishList();
          setWishListProducts(response?.data?.products);
        }
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishList();
  }, [fetchWishList]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="products-main-component">
        <div
          className={`product-bar ${isFixed ? "fixed" : "relative"}`}
          id="productBar"
        >
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

          <Typography
            sx={{
              fontSize: { xs: "3.8vw", sm: "3vw", lg: "2.5vw" },
              color: "white",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
            onClick={() => navigate("/")}
          >
            ShopVerse
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Autocomplete
              options={searchableProducts}
              filterSelectedOptions={true}
              size="sm"
              freeSolo={false}
              onInputChange={(event, value) => setSearchQuery(value)}
              onChange={(event, value) => setSearchQuery(value || "")}
              PopperComponent={CustomPopper}
              PaperComponent={CustomPaper}
              sx={{
                "& .MuiAutocomplete-popupIndicator": {
                  display: "none",
                },
                padding: { xs: "1vw", sm: "0vw", lg: "0vw" },
                paddingLeft: { xs: "1vw", sm: "1.2vw", lg: "1vw" },
                paddingRight: { xs: "1vw", lg: "1vw" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: {
                  xs: "25vw",
                  sm: "18vw",
                  lg: "15vw",
                },
                height: { xs: "3vw", lg: "2.5vw" },
                backgroundColor: "white",
                borderRadius: "2vw",
                boxShadow: "none",
                outline: "none",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="  ....Search products"
                  sx={{
                    boxShadow: "none",
                    borderColor: "transparent",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px !important",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 !important",
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "transparent",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: { xs: "2vw", sm: "1.5vw", lg: "1vw" },
                        fontWeight: { lg: "600" },
                        padding: { xs: "0vw", sm: "0vw", lg: "0.5vw" },
                      },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "transparent",
                      },
                  }}
                />
              )}
            />
          </div>
          <div className="product-bar-right">
            <Typography
              sx={{
                fontSize: { sm: "2vw", lg: "1.3vw" },
                color: "white",
                cursor: "pointer",
                fontFamily: "Merriweather, serif",
              }}
              onClick={() => {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user && user.userId) {
                  handleWishlist();
                } else {
                  setParentOpen(true);
                }
              }}
            >
              Wishlist
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: "2vw", lg: "1.3vw" },
                color: "white",
                cursor: "pointer",
                fontFamily: "Merriweather, serif",
              }}
              onClick={() => {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user && user.userId) {
                  navigate("/cart");
                } else {
                  setParentOpen(true);
                }
              }}
            >
              Cart
            </Typography>
            <AccountMenu />
          </div>
          <div className="phone-bar">
            <div className="phone-icon-right">
              <AccountMenu />
              <ShoppingCartOutlineIcon
                sx={{ margin: "0vw" }}
                onClick={() => navigate("/cart")}
              />
              <FavoriteRoundedIcon onClick={() => handleWishlist()} />
            </div>
          </div>
        </div>
        {modalToBeDisplayed && (
          <WishListModal
            wishListLoading={wishListLoading}
            shouldBeDisplayed={modalToBeDisplayed}
            setShouldBeDisplayed={setModalToBeDisplayed}
            handleRemoveFromWishList={handleRemoveFromWishList}
            wishListProds={wishListProducts}
          />
        )}
        {loading && (
          <div className="indv-skeleton-disp">
            {Array.from({ length: 15 }).map((_, index) => (
              <div className="product-skeleton" key={index}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{
                    width: {
                      xs: "40vw",
                      sm: "40vw",
                      md: "17vw",
                      lg: "17.5vw",
                    },
                    height: { xs: "30vh", sm: "45vh", md: "20vw", lg: "18vw" },
                    bgcolor: "grey.300",
                    margin: 0,
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: { xs: "5vw", sm: "4vw", md: "3vw", lg: "2vw" },
                    width: { xs: "20vw", sm: "25vw", md: "10vw", lg: "12vw" },
                    margin: 0,
                    lineHeight: 0.9,
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: { xs: "5vw", sm: "2vw", md: "1vw", lg: "1vw" },
                    margin: 0,
                    lineHeight: 1,
                  }}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: { xs: "5vw", sm: "2vw", md: "1vw", lg: "1vw" },
                    width: { xs: "10vw", sm: "20vw", md: "10vw", lg: "8vw" },
                    margin: 0,
                    lineHeight: 1,
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {filteredData && (
          <div className="indv-prod-disp">
            {filteredData.map((product, index) => (
              <WaterfallEffect key={index}>
                <IndividualProductCard
                  url={product.imageURL}
                  product={product}
                  wishListProducts={wishListProducts}
                  addToWishList={handleAddToWishList}
                  removeFromWishList={handleRemoveFromWishList}
                />
              </WaterfallEffect>
            ))}
          </div>
        )}
        {/* {filteredData && filteredData.length === 0 && (
          <Typography sx={{ fontSize: { lg: "3vw" } }}>
            Oh Oh... ! Product Not Found
          </Typography>
        )} */}
        {filteredData && (
          <div className="indv-prod-disp">
            {filteredData.map((product, index) => (
              <WaterfallEffect key={index}>
                <IndividualProductCard
                  url={product.imageURL}
                  product={product}
                  addToWishList={handleAddToWishList}
                  removeFromWishList={handleRemoveFromWishList}
                />
              </WaterfallEffect>
            ))}
          </div>
        )}
        {!data && (
          <div className="indv-prod-disp">
            <IndividualProductCard rating={3.5} numberOfRated={"90k"} />
            <IndividualProductCard rating={3.5} numberOfRated={"65k"} />
            <IndividualProductCard rating={3.5} numberOfRated={"90k"} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
