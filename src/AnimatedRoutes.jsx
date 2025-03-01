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
import AddProduct from "./pages/AddProduct";
import ViewProducts from "./pages/ViewProducts";
import UpdateProduct from "./pages/UpdateProduct";
import ErrorBoundary from "./pages/ErrorPage";
import ErrorPage from "./pages/ErrorPage";

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
        <Route
          path="/addProducts"
          element={
            <AnimatedWrapper>
              <AddProduct />
            </AnimatedWrapper>
          }
        />
        <Route
          path="/viewProducts"
          element={
            <AnimatedWrapper>
              <ViewProducts />
            </AnimatedWrapper>
          }
        />
        <Route
          path="/updateProduct"
          element={
            <AnimatedWrapper>
              <UpdateProduct />
            </AnimatedWrapper>
          }
        />
        <Route
          path="/errorBoundary"
          element={
            <AnimatedWrapper>
              <ErrorPage />
            </AnimatedWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
