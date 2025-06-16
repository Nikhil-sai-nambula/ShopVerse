import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./ProductPageStyles.css";
import { Typography } from "@mui/material";
import Particles from "../components/core/Particles";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const [productData, setProductData] = useState({
    name: "",
    oneLiner: "",
    category: "M_Shirts",
    description: "",
    price: 0,
    discountPercentage: 0,
    sellerId: "seller123",
    imageURL: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [user]);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        oneLiner: product.oneLiner,
        category: product.category,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        sellerId: product.sellerId,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discountPercentage"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("oneLiner", productData.oneLiner);
      formData.append("category", productData.category);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("discountPercentage", productData.discountPercentage);
      formData.append("sellerId", productData.sellerId);
      const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;

      const response = await axios.put(
        `${apiUrl}m/seller/product/update/${product.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Product updated successfully!");
        navigate(-1);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!loading && !product) {
    return <div>No product found!</div>;
  }

  return (
    <div className="add-product-page">
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          zIndex: "1",
        }}
      >
        <Particles
          particleColors={["#FFFFFF", "#FFFFFF"]}
          particleCount={500}
          particleSpread={8}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div style={{ zIndex: "10", position: "relative" }}>
        <Typography
          sx={{
            fontSize: "2vw",
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Update Product
        </Typography>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <div className="add-product-page register-page">
          <form onSubmit={handleSubmit} className="register-box">
            <div className="form-group">
              <label>Product Name</label>
              <input
                className="input"
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>One Line Description</label>
              <input
                className="input"
                type="text"
                name="oneLiner"
                value={productData.oneLiner}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="input"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
              >
                <option value="M_Shirts">Shirts</option>
                <option value="M_Pants">Trousers</option>
                <option value="Home">Suits</option>
                <option value="Books">Books</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                className="input"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input
                className="input"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Discount Percentage</label>
              <input
                className="input"
                type="number"
                name="discountPercentage"
                value={productData.discountPercentage}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="1"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
