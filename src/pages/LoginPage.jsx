import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import SuccessfullSnackBar from "../components/utilities/SuccessfullSnackBar";
import Particles from "../components/core/Particles";
import "./authPageStyles.css";
import HeaderSymbol from "../components/utilities/HeaderSymbol";
import appImage from ".././assets/images/clothes-suit-svgrepo-com.svg";
import { Box } from "@mui/material";

export default function Login() {
  const { login } = useContext(AuthContext);
  const { fetchCart } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarToBeShown, setSnackBarToBeShown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateFormData()) {
      return;
    }
    try {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;
      const response = await axios.post(`${apiUrl}/auth/login`, formData);

      if (response.status === 200) {
        setSnackBarToBeShown(true);
        await login(response.data);
        localStorage.setItem("email", formData.email);
        await fetchCart();
        setTimeout(() => {
          navigate("/products");
        }, 1000);
      }
    } catch (errors) {
      console.log(errors);
      if (errors.response?.status === 401) {
        setResponse("Invalid Credentials");
      } else if (errors.response?.status === 403) {
        setResponse("Email verification is incomplete");
      } else {
        setResponse(errors.response?.data?.message || "Login Failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateFormData = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please Enter a Valid Email";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is Required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should have atleast 6 characters";
      setFormData((prev) => ({ ...prev, password: "" }));
    } else if (formData.password.length >= 30) {
      newErrors.password = "Password can max contain 30 characters";
      setFormData((prev) => ({ ...prev, password: "" }));
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="login-page">
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          zIndex: "1",
          backgroundColor: "black",
        }}
      >
        <Particles
          particleColors={["#FFFFFF", "#FFFFFF"]}
          particleCount={200}
          particleSpread={8}
          speed={0.1}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="register-page">
        <div className="register-box">
          <h1 className="heading">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="input"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            <button
              className="submit"
              type="submit"
              disabled={isLoading}
              style={{ cursor: `${isLoading ? "not-allowed" : "pointer"}` }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          {response && <p className="error-message">{response}</p>}
          {
            <u>
              <p
                className="login-to-register"
                onClick={() => navigate("/register")}
              >
                Haven't registered Yet ?
              </p>
              <p className="login-to-register" onClick={() => navigate("/")}>
                Back To HomePage
              </p>
            </u>
          }
        </div>
        <SuccessfullSnackBar
          open={snackBarToBeShown}
          onClose={() => setOpenSnackbar(false)}
          message={"SuccessFully Logged In"}
        />
      </div>
    </div>
  );
}
