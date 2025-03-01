import { useNavigate } from "react-router-dom";
import FuzzyText from "../components/core/FuzzyText";
import LetterGlitch from "../components/utilities/LetterGlitch";
import { useEffect } from "react";
import { Button } from "@mui/material";

export default function ErrorPage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/products");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
          color="white"
          fontSize="4vw"
        >
          {props?.value || "Oh Oh.. Something went wrong"}
        </FuzzyText>

        <Button
          variant="standard"
          sx={{
            textTransform: "none",
            display: "flex",
            justifyContent: "center",
            justifySelf: "center",
            alignItems: "center",
            color: "black",
            backgroundColor: "white",
            height: { lg: "1.3vw" },
            padding: { lg: "1vw" },
            fontSize: { lg: "1vw" },
            margin: { lg: "1vw" },
            width: "auto",
            borderRadius: { lg: "2vw" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate("/products");
          }}
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
}
