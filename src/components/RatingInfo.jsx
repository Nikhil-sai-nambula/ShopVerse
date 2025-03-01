import { useState } from "react";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export default function (props) {
  const [randomRating] = useState(() =>
    (Math.random() * (4.9 - 4.1) + 4.1).toFixed(1)
  );
  const [randomNumberOfRatings] = useState(() =>
    Math.floor(Math.random() * (190000 - 1000) + 1000)
  );

  return (
    <div className="card-rating">
      {props.rating ?? randomRating}
      <StarRateRoundedIcon sx={{ color: "brown" }} />
      {Math.round(
        parseInt((props.numberOfRatings ?? randomNumberOfRatings) / 1000)
      )}
      k
    </div>
  );
}
