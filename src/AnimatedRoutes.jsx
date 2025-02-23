import {
  Route,
  Routes,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import ProductInfo from "./pages/ProductInfo";
import Cart from "./pages/Cart";
import AnimatedWrapper from "./AnimatedWrapper";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import ScrollRestore from "./ScrollRestore";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="sync">
      <ScrollRestore />
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedWrapper>
              <HomePage />
            </AnimatedWrapper>
          }
        />
        <Route
          path="/products"
          element={
            <AnimatedWrapper>
              <Products />
            </AnimatedWrapper>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <AnimatedWrapper>
              <ProductInfo />
            </AnimatedWrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <AnimatedWrapper>
              <Cart />
            </AnimatedWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <AnimatedWrapper>
              <Register />
            </AnimatedWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatedWrapper>
              <LoginPage />
            </AnimatedWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
