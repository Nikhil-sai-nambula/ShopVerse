import {
  Button,
  DialogTitle,
  Drawer,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./componentWishListStyles.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WaterfallEffect from "../animation/WaterFallEffect";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function WishListModal({
  shouldBeDisplayed,
  wishListProds,
  wishListLoading,
  setShouldBeDisplayed,
  handleRemoveFromWishList,
}) {
  const [open, setOpen] = React.useState(false);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    setOpen(shouldBeDisplayed);
  }, [shouldBeDisplayed]);

  const handleClose = () => {
    setShouldBeDisplayed?.(false);
    setOpen(false);
  };

  return (
    <div className="wishlist-modal">
      <Drawer
        open={open}
        onClose={() => handleClose()}
        anchor="right"
        PaperProps={{
          sx: {
            width: {
              xs: "60vw",
              sm: "50vw",
              md: "30vw",
              lg: "30vw",
            },
          },
        }}
      >
        {shouldBeDisplayed &&
          (!wishListProds || wishListProds.length === 0) &&
          Array.from({ length: 5 }).map((_, index) => (
            <div className="wishlist-skeleton" key={index}>
              <div style={{ display: "flex", margin: "1vw", gap: "1vw" }}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{
                    width: {
                      xs: "12vw",
                      sm: "15vw",
                      md: "17vw",
                      lg: "8vw",
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
                      width: { xs: "20vw", sm: "15vw", md: "15vw", lg: "15vw" },
                      margin: 0,
                      lineHeight: { sm: 1, lg: 2 },
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: "1vw", sm: "4vw", md: "3vw", lg: "1vw" },
                      width: { xs: "20vw", sm: "15vw", md: "15vw", lg: "15vw" },
                      margin: 0,
                      lineHeight: { sm: 1, lg: 1 },
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: { xs: "1vw", sm: "4vw", md: "3vw", lg: "1vw" },
                      width: { xs: "20vw", sm: "15vw", md: "15vw", lg: "15vw" },
                      margin: 0,
                      lineHeight: { sm: 1, lg: 1 },
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        <div className="wishList-container">
          {shouldBeDisplayed &&
            wishListProds.map((product, index) => {
              return (
                <WaterfallEffect>
                  <div
                    className="wishlist-items"
                    key={index}
                    style={{ display: "flex", gap: "2vw", marginBottom: "1vw" }}
                  >
                    <img
                      className="wishlist-indv-image"
                      src={product.imageURL}
                    />
                    <div className="wislist-ind-details">
                      <div style={{ display: "flex", gap: "1.5vw" }}>
                        <div>
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: {
                                xs: "2.4vw",
                                sm: "1.5vw",
                                lg: "1.1vw",
                              },
                              fontWeight: "500",
                            }}
                          >
                            {product.productName}
                          </Typography>
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: { xs: "2vw", sm: "1.5vw", lg: "0.9vw" },
                              fontWeight: "500",
                            }}
                          >
                            {product.productOneLiner}
                          </Typography>
                          <div className="price" style={{ display: "flex" }}>
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "2vw",
                                  sm: "1.5vw",
                                  lg: "0.9vw",
                                },
                                fontWeight: "500",
                              }}
                            >
                              ₹{product.price}
                            </Typography>
                          </div>
                        </div>
                        <div>
                          <div
                            onMouseEnter={() => setIsHovered(index)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() =>
                              handleRemoveFromWishList(product?.productId)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {isHovered === index ? (
                              <DeleteForeverIcon
                                sx={{
                                  color: "grey",
                                  left: "12vw",
                                  bottom: "5.5vw",
                                  fontSize: { xs: 20, lg: 25 },
                                  zIndex: "1",
                                }}
                              />
                            ) : (
                              <DeleteOutlineIcon
                                sx={{
                                  color: "grey",
                                  left: "12vw",
                                  bottom: "5.5vw",
                                  fontSize: { xs: 20, lg: 25 },
                                  zIndex: "1",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </WaterfallEffect>
              );
            })}
        </div>
      </Drawer>
    </div>
  );
}
