import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductPageStyles.css";
import { Typography } from "@mui/material";
import BlurText from "../components/core/BlurText";
import Particles from "../components/core/Particles";

export default function AddProduct() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));

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

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [user]);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    setProductData((prev) => ({
      ...prev,
      imageURL: files,
    }));
  };

  const handleSubmit = async (e) => {
    if (user) {
      e.preventDefault();
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
        formData.append("sellerId", user.userId);

        productData.imageURL.forEach((file, index) => {
          formData.append(`imageURL`, file);
        });

        console.log(formData);
        const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;

        const response = await axios.post(
          "${apiUrl}/seller/product/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          setSuccess("Product uploaded successfully!");
          setProductData({
            name: "",
            oneLiner: "",
            category: "Electronics",
            description: "",
            price: 0,
            discountPercentage: 0,
            sellerId: "seller123",
            imageURL: [],
          });
          setImagePreviews([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Product upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="add-product-page">
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
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

      <Typography
        sx={{
          fontSize: "2vw",
          color: "white",
          display: "flex",
          marginTop: { lg: "1vw" },
          justifyContent: "center",
        }}
      >
        Add Your Products
      </Typography>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
      <div className="register-page">
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

          <div className="form-group">
            <label>Product Images</label>
            <input
              className="input"
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
            />
            <div className="image-previews-container">
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Preview ${index}`} />
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
