import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export default function (props) {
  return (
    <div className="card-rating">
      {props.rating == null ? 4.5 : props.rating}
      <StarRateRoundedIcon
        sx={{
          color: "brown",
        }}
      />
      {props.numberOfRatings == null ? 59 : props.numberOfRatings}
    </div>
  );
}
