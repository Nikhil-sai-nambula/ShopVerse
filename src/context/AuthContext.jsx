import { createContext, useContext, useState } from "react";
import { useCart } from "./CartContext";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const { fetchCart } = useCart();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    await fetchCart();
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    await fetchCart();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
