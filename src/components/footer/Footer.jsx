import MainHeading from "../MainHeading";
import "./componentFooter.css";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import WaterfallEffect from "../animation/WaterFallEffect";
import { Typography } from "@mui/material";
import SuccessfullSnackBar from "../utilities/SuccessfullSnackBar";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";

export default function () {
  const [snackBarToBeShown, setSnackBarToBeShown] = useState(false);
  let headingSize = "1.5vw";
  let subHeadingSize = "1.3vw";

  const commonFontStyle = {
    fontFamily: "Merriweather, serif",
    color: "white",
    cursor: "pointer",
  };

  const iconStyle = {
    color: "#d4af37",
    fontSize: { xs: "5vw", sm: "3vw", lg: "2vw" },
    borderRadius: "10vw",
    cursor: "pointer",
  };

  const contactIconStyle = {
    color: "#d4af37",
    fontSize: { xs: "4vw", sm: "1.3vw", lg: "1.3vw" },
    borderRadius: "10vw",
    cursor: "pointer",
  };

  return (
    <div className="footer-main-component">
      <div className="footer-row1">
        <div className="footer-column1">
          <WaterfallEffect>
            <div className="brand-name">
              <Typography
                sx={{
                  ...commonFontStyle,
                  fontSize: { xs: "4vw", sm: "2vw", lg: "1.5vw" },
                  color: "#d4af37",
                }}
              >
                ShopVerse
              </Typography>
              <Typography
                sx={{
                  ...commonFontStyle,
                  fontSize: { xs: "3vw", sm: "1.3vw", lg: "1.2vw" },
                }}
              >
                Your Ultimate Shopping Destination
              </Typography>
            </div>
            <div className="brand-name">
              <Typography
                sx={{
                  ...commonFontStyle,
                  fontSize: { xs: "4vw", sm: "2vw", lg: "1.5vw" },
                  color: "#d4af37",
                }}
              >
                About Us
              </Typography>
              <Typography
                sx={{
                  ...commonFontStyle,
                  fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
                  width: { xs: "60vw", sm: "30vw", lg: "20vw" },
                }}
              >
                Discover the finest products, curated for an exceptional
                shopping experience.
              </Typography>
            </div>
            <div className="brand-name">
              <Typography
                sx={{
                  ...commonFontStyle,
                  fontSize: { xs: "4vw", sm: "2vw", lg: "1.5vw" },
                  color: "#d4af37",
                }}
              >
                Contact Us
              </Typography>
              <div className="footer-contact">
                <WifiCalling3Icon sx={contactIconStyle} />
                <Typography
                  sx={{
                    ...commonFontStyle,
                    fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
                  }}
                >
                  +91 63050-57714
                </Typography>
              </div>
              <div className="footer-contact">
                <EmailIcon sx={contactIconStyle} />
                <Typography
                  sx={{
                    ...commonFontStyle,
                    fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
                  }}
                >
                  nambula.nikhilsai@gmail.com
                </Typography>
              </div>
            </div>
          </WaterfallEffect>
        </div>
        <div className="footer-column2">
          <WaterfallEffect>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "4vw", sm: "2vw", lg: "1.5vw" },
                color: "#d4af37",
              }}
            >
              Information
            </Typography>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              About Us
            </Typography>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              More Search
            </Typography>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              Blogs
            </Typography>

            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              Testimonials
            </Typography>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              Events
            </Typography>
          </WaterfallEffect>
        </div>
        <div className="footer-column2">
          <WaterfallEffect>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "4vw", sm: "2vw", lg: "1.5vw" },
                color: "#d4af37",
              }}
            >
              Helpful Links
            </Typography>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              Services
            </Typography>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              Support
            </Typography>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              Terms & Conditions
            </Typography>

            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "1.3vw", lg: "1vw" },
              }}
            >
              Events
            </Typography>
          </WaterfallEffect>
        </div>
        <div className="footer-line-1"></div>
        <div className="footer-column4">
          <WaterfallEffect>
            <Typography
              sx={{
                ...commonFontStyle,
                fontSize: { xs: "3vw", sm: "2vw", lg: "1.5vw" },
                marginLeft: "2vw",
              }}
            >
              Subscribe for More
            </Typography>
            <div className="email-container">
              <span className="email-icon">
                <MailIcon sx={{ color: "#d4af37" }} />
              </span>
              <input
                type="email"
                placeholder=" ...Enter your e-mail"
                className="email-input-with-icon"
              />
            </div>
            <button
              className="email-subscribe"
              onClick={() => setSnackBarToBeShown(false)}
            >
              Subscribe
            </button>
          </WaterfallEffect>
        </div>
      </div>
      <div className="footer-row2">
        <div className="footer-line"></div>
        <div className="social-media-handles">
          <a
            href="https://github.com/Nikhil-sai-nambula/e-commerce-application"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon sx={iconStyle} />
          </a>
          <FacebookIcon sx={iconStyle} />
          <GoogleIcon sx={iconStyle} />
          <InstagramIcon sx={iconStyle} />
        </div>
      </div>
      <SuccessfullSnackBar
        open={snackBarToBeShown}
        onClose={() => setSnackBarToBeShown(false)}
        message={"Subscribed"}
      />
    </div>
  );
}
