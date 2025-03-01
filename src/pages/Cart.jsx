import React, { memo, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import CartImage from "../components/cart/CartImage";
import CartProductName from "../components/cart/CartProductName";
import ProductCardOneLiner from "../components/product/ProductCardOneLiner";
import CartProductPrice from "../components/cart/CartProductPrice";
import CartProductHeadings from "../components/cart/CartProductHeadings";
import CartProductLine from "../components/cart/CartProductLine";
import CartPtoductQuantity from "../components/cart/CartProductQuantity";
import deleteIcon from "../assets/svg/delete.svg";
import { Skeleton, Tooltip, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WaterfallEffect from "../components/animation/WaterFallEffect";
import CartOrderDetails from "../components/cart/CartOrderDetails";
import CartProductQuantity from "../components/cart/CartProductQuantity";

export default function (props) {
  const { cartProducts, fetchCart, addToCart, removeFromCart, cartLoading } =
    useCart();
  const [reloadCount, setReloadCount] = useState(0);

  let size = 42;
  if (props.size) {
    size = props.size;
  }

  let gender = "M";
  if (props.gender) {
    size = props.gender;
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchCart();
    };
    fetchData();
  }, [fetchCart]);

  const handleClick = async (id) => {
    await removeFromCart(id);
    await fetchCart();
  };

  return (
    <div className="cart-main-container">
      <WaterfallEffect>
        <div className="cart-products">
          {cartLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                style={{
                  display: "flex",
                  gap: "2vw",
                  alignContent: "center",
                  marginBottom: "1vw",
                }}
                key={index}
              >
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{
                    width: {
                      xs: "15vw",
                      sm: "15vw",
                      md: "17vw",
                      lg: "9vw",
                    },
                    height: { xs: "9vh", sm: "17vw", md: "20vw", lg: "10vw" },
                    bgcolor: "grey.300",
                    margin: 0,
                  }}
                />
                <div>
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: "1vw", sm: "4vw", md: "3vw", lg: "1vw" },
                      width: { xs: "20vw", sm: "30vw", md: "30vw", lg: "30vw" },
                      margin: 0,
                      lineHeight: { sm: 1, lg: 2 },
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: "1vw", sm: "4vw", md: "3vw", lg: "1vw" },
                      width: { xs: "20vw", sm: "30vw", md: "30vw", lg: "30vw" },
                      margin: 0,
                      lineHeight: { sm: 0.5, lg: 0.9 },
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: "1vw", sm: "4vw", md: "3vw", lg: "1vw" },
                      width: { xs: "20vw", sm: "30vw", md: "30vw", lg: "30vw" },
                      margin: 0,
                      lineHeight: { sm: 0.5, lg: 0.9 },
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: "1vw", sm: "4vw", md: "3vw", lg: "1vw" },
                      width: { xs: "15vw", sm: "15vw", md: "30vw", lg: "10vw" },
                      marginTop: { sm: "4vw", lg: "3.5vw" },
                      lineHeight: { sm: 0.5, lg: 1.2 },
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: "1vw", sm: "4vw", md: "3vw", lg: "1vw" },
                      width: { xs: "15vw", sm: "15vw", md: "30vw", lg: "10vw" },
                      lineHeight: { sm: 0.5, lg: 1.2 },
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: "1vw", sm: "4vw", md: "3vw", lg: "1vw" },
                      width: { xs: "15vw", sm: "10vw", md: "10vw", lg: "7vw" },
                      lineHeight: { sm: 0.5, lg: 1.2 },
                      marginTop: { sm: "1vw", lg: "0.5vw" },
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: "1vw", sm: "4vw", md: "3vw", lg: "1vw" },
                      width: { xs: "15vw", sm: "10vw", md: "10vw", lg: "7vw" },
                      lineHeight: { sm: 0.5, lg: 1.2 },
                    }}
                  />
                </div>
              </div>
            ))}
          {!cartLoading && (
            <>
              {!cartProducts || cartProducts.length === 0 ? (
                <>
                  {/* <CartProductHeadings /> */}
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: { xs: "4vw", sm: "4vw", lg: "2vw" },
                      color: "black",
                      cursor: "pointer",
                      fontFamily: "monospace",
                    }}
                  >
                    Oh Oh... Your Cart is Empty
                  </Typography>
                </>
              ) : (
                <>
                  <CartProductHeadings />
                  {cartProducts.map((product) => (
                    <React.Fragment key={product.productId}>
                      <div className="cart-container">
                        <CartImage url={product.imageURL} />
                        <div className="cart-product-info">
                          <CartProductName />
                          <ProductCardOneLiner
                            style={{
                              color: "grey",
                              fontSize: "1vw",
                              maxWidth: "15vw",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          />
                          {product.gender && (
                            <ProductCardOneLiner
                              value={`Gender: ${product.gender}`}
                              style={{
                                fontSize: "1vw",
                                color: "#213333",
                                marginTop: "4vw",
                                fontWeight: "550",
                              }}
                            />
                          )}
                          <ProductCardOneLiner
                            value={`Size: ${product.productSize}`}
                            style={{
                              fontSize: "1vw",
                              color: "#213333",
                              fontWeight: "550",
                            }}
                          />
                        </div>
                        <CartProductPrice
                          price={product.price}
                          style={{
                            fontSize: "1.3vw",
                            fontWeight: "550",
                            color: "black",
                          }}
                        />
                        <CartProductQuantity
                          value={product.quantity}
                          id={product.productId}
                        />
                        <CartProductPrice
                          price={product.price * product.quantity}
                          style={{
                            fontSize: "2vw",
                            fontWeight: "590",
                            color: "#d4af37",
                            marginLeft: "4vw",
                          }}
                        />
                        <Tooltip title="Delete" size="md" variant="soft">
                          <DeleteOutlineIcon
                            sx={{
                              color: "black",
                              marginTop: "4.6vw",
                              fontSize: "1.5vw",
                              marginLeft: "1vw",
                            }}
                            onClick={() => handleClick(product.productId)}
                          />
                        </Tooltip>
                      </div>
                      <CartProductLine />
                    </React.Fragment>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </WaterfallEffect>
      {!cartProducts || cartProducts.length === 0 ? null : <CartOrderDetails />}
    </div>
  );
}
