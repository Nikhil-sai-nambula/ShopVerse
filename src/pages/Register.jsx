import axios from "axios";
import { useEffect, useState } from "react";
import "./authPageStyles.css";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SuccessfullSnackBar from "../components/utilities/SuccessfullSnackBar";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [OTPData, setOTPData] = useState({
    email: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState("");
  const [OTP, setOTP] = useState("");
  const [OTPTobeVerified, setOTPtobeVerified] = useState(false);
  const [OTPResponse, setOTPResponse] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarToBeShown, setSnackBarToBeShown] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePassword = (e) => {
    setConfirmPassword(e.target.value);
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateFormData = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
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
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Password must match in both fields";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateFormData()) {
      return;
    }
    sessionStorage.setItem("email", formData.email);
    try {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;
      const response = await axios.post(`${apiUrl}/auth/register`, formData);
      setResponse(response?.data?.message);
      if (response?.status === 200) {
        setSnackBarToBeShown(true);
        setOTPtobeVerified(true);
      }
    } catch (error) {
      setResponse(
        error.response?.data ||
          "Registration Failed!  Please try after some time"
      );
      setTimeout(() => {
        setResponse(null);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    if (OTPTobeVerified) {
      const updatedOTPData = {
        email: sessionStorage.getItem("email"),
        otp: OTP,
      };

      setOTPData(updatedOTPData);

      try {
        const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;
        const response = await axios.post(
          `${apiUrl}/auth/verify-OTP`,
          updatedOTPData
        );
        setOTPResponse(response.data);
      } catch (error) {
        setOTPResponse(
          error.response?.data?.message || "Could not fulfill OTP request"
        );
      }
    }
  };

  return (
    <div className="register-page">
      {!OTPTobeVerified && (
        <div className="register-box">
          <h1 className="heading">Register</h1>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
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
                  type="password"
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
            {
              <SuccessfullSnackBar
                open={snackBarToBeShown}
                onClose={() => setOpenSnackbar(false)}
                message={"SuccessFully Logged In"}
              />
            }
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="input"
                value={confirmPassword}
                onChange={handlePassword}
              />
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
            <button
              className="submit"
              type="submit"
              disabled={isLoading}
              style={{ cursor: `${isLoading ? "not-allowed" : "pointer"}` }}
            >
              {isLoading ? "Registering User..." : "Register"}
            </button>
          </form>
          {response && <p className="error-message">{response}</p>}
          <br />
          {
            <u>
              <p onClick={() => navigate("/login")}>
                Registered already ? Login
              </p>
            </u>
          }
        </div>
      )}
      {OTPTobeVerified && (
        <div className="register-box">
          <h1 className="heading">Verify OTP</h1>
          <p className="otpinfo">
            An OTP has been sent to your email. Please enter it below.
          </p>
          <div className="form-group otp">
            <label htmlFor="otp">OTP</label>
            <div className="otp-box">
              <input
                type="text"
                name="otp"
                id="otp"
                className="input"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </div>
            <button
              className="submit"
              style={{ marginTop: "2vw" }}
              type="verify-otp"
              onClick={handleOTP}
            >
              Verify OTP
            </button>
            {OTPResponse && (
              <p style={{ textAlign: "center" }} className="error-message">
                {OTPResponse}
              </p>
            )}
            {
              <p
                className="login-to-register"
                style={{ marginBottom: "-2vw" }}
                onClick={() => navigate("/login")}
              >
                <u>Back to Login Page</u>
              </p>
            }
          </div>
        </div>
      )}
    </div>
  );
}
