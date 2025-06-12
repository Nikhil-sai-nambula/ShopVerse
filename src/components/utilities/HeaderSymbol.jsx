import { Box } from "@mui/material";
import appImage from "../../assets/images/clothes-suit-svgrepo-com.svg";

const HeaderSymbol = () => {
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1vw",
            justifyContent: "center",
          }}
        >
          <div>
            <Box
              component="img"
              src={appImage}
              sx={{
                height: { xs: "4vw", sm: "2vw", lg: "1.5vw" },
                width: { xs: "4vw", sm: "2vw", lg: "1.5vw" },
              }}
            />
          </div>
          <div>
            <p
              className="heading"
              style={{
                fontSize: "2vw",
                fontWeight: "700",
                color: "black",
                fontFamily: "Lucida Sans Unicode",
              }}
            >
              Shopverse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSymbol;
