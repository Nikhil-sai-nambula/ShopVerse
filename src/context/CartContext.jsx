import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SnackBar from "../components/utilities/SuccessfullSnackBar";
import SuccessfullSnackBar from "../components/utilities/SuccessfullSnackBar";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setcartProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, [localStorage.getItem("user")]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [user]);

  useEffect(() => {
    if (!user) {
      setcartProducts([]);
      localStorage.removeItem("cart");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    setcartProducts(cartProducts);
  }, [cartProducts]);

  useEffect(() => {
    if (user && user.userId) {
      fetchCart();
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const parsedCart = savedCart.map((item) => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity),
      }));
      setcartProducts(parsedCart);
    }
  }, [user]);

  const fetchCart = useCallback(async () => {
    if (user) {
      try {
        setCartLoading(true);
        const response = await axios.get(
          `${process.env.SHOPVERSE_URL}/cart/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setCartLoading(false);
          setcartProducts(response.data.items || []);
          localStorage.setItem(
            "cart",
            JSON.stringify(response.data.items || [])
          );
        }
      } catch (errors) {
        console.log(errors);
        localStorage.removeItem("cart");
        setcartProducts([]);
      }
    } else {
      setcartProducts([]);
    }
  }, [user?.userId, token]);

  const addToCart = async (product, productSize, quantity, productId) => {
    if (user) {
      try {
        const response = await axios.post(
          `${process.env.SHOPVERSE_URL}/cart/add/${user.userId}`,
          {
            productId,
            productSize,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setSnackbarMessage("Product Added to Cart");
          setOpenSnackbar(true);
        }
        await fetchCart();
      } catch (errors) {
        console.log("Error Adding to cart", errors);
      }
    } else {
      const existingProductIndex = cartProducts.findIndex(
        (item) => item.product.id === productId
      );

      if (existingProductIndex !== -1) {
        setcartProducts((prev) => {
          const updatedCart = [...prev];
          updatedCart[existingProductIndex].quantity += quantity;
          return updatedCart;
        });
      } else {
        setcartProducts((prev) => [
          ...prev,
          { product, productSize, quantity },
        ]);
      }
    }
  };

  const removeFromCart = async (productId) => {
    if (user && user.userId) {
      try {
        const response = await axios.delete(
          `${process.env.SHOPVERSE_URL}/cart/remove-item`,
          {
            params: { userId: user.userId, productId },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setcartProducts((prev) => {
            const updatedCart = prev.filter(
              (item) => item.productId !== productId
            );

            if (updatedCart.length === 0) {
              localStorage.removeItem("cart");
            } else {
              localStorage.setItem("cart", JSON.stringify(updatedCart));
            }

            return updatedCart;
          });
        }

        await fetchCart();
      } catch (errors) {
        console.log("Error removing items", errors);
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (user) {
      try {
        await axios.put(
          `${process.env.SHOPVERSE_URL}/cart/update-quantity`,
          {
            userId: user.userId,
            productId,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        await fetchCart();
      } catch (errors) {
        console.log("Error Updating quantity", errors);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        fetchCart,
        updateQuantity,
        cartLoading,
      }}
    >
      {children}
      <SuccessfullSnackBar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
