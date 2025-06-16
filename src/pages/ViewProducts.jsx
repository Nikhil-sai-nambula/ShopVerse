import { Typography } from "@mui/material";
import WaterfallEffect from "../components/animation/WaterFallEffect";
import ViewIndvProducts from "./ViewIndvProducts";
import { useEffect, useState } from "react";
import "./ProductPageStyles.css";
import axios from "axios";
import Squares from "../components/core/Particles";
import BlurText from "../components/core/BlurText";
import zIndex from "@mui/material/styles/zIndex";
import SellerAppBar from "../components/utilities/SellerAppBar";
import Particles from "../components/core/Particles";
import { useNavigate } from "react-router-dom";

export default function ViewProucts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [user]);

  const fetchData = async () => {
    if (user) {
      console.log(user);
      try {
        const apiUrl = import.meta.env.VITE_SHOPVERSE_URL;
        const response = await axios.get(`${apiUrl}m/seller/${user?.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="view-products-page">
      <div
        style={{
          width: "100%",
          height: "50vh",
          position: "fixed",
          zIndex: "1",
        }}
      >
        <Particles
          particleColors={["white", "black"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <SellerAppBar />
      <div style={{ zIndex: 11, position: "relative" }}>
        <BlurText
          text="Hey Seller !    Monitor your DashBoard"
          delay={150}
          animateBy="words"
          direction="top"
          className="customBlurText"
          style={{
            fontSize: "2vw",
            color: "black",
            fontWeight: "bold",
            marginTop: "10vw",
            zIndex: 1,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3vw",
            marginBottom: "3vw",
          }}
        >
          <button
            onClick={() => fetchData()}
            style={{
              display: "flex",
              justifySelf: "center",
              alignSelf: "center",
              padding: "0.7vw",
              marginTop: "2vw",
              width: "auto",
              fontSize: "1.5vw",
            }}
          >
            View Products
          </button>

          <button
            style={{
              display: "flex",
              justifySelf: "center",
              alignSelf: "center",
              padding: "0.7vw",
              marginTop: "2vw",
              width: "auto",
              fontSize: "1.5vw",
            }}
            onClick={() => navigate("/addProducts")}
          >
            Add Products
          </button>
          {/* <button
            style={{
              display: "flex",
              justifySelf: "center",
              alignSelf: "center",
              padding: "0.7vw",
              marginTop: "2vw",
              width: "auto",
              fontSize: "1.5vw",
            }}
            onClick={() => navigate("/errorBoundary")}
          >
            error page
          </button> */}
        </div>
        {data && (
          <>
            <div className="indv-prod-disp">
              {data.map((product, index) => (
                <WaterfallEffect key={index}>
                  <ViewIndvProducts url={product.imageURL} product={product} />
                </WaterfallEffect>
              ))}
            </div>
            <div className="indv-prod-disp">
              {data.map((product, index) => (
                <WaterfallEffect key={index}>
                  <ViewIndvProducts url={product.imageURL} product={product} />
                </WaterfallEffect>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
