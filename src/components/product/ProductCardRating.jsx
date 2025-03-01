import StarIcon from "@mui/icons-material/Star";
export default function (props) {
  return (
    <div className="product-card-rating">
      {4.7}
      <StarIcon style={{ color: "#d4af37" }} />
      {props?.value ? `${props.value}` : "| 39K+ Ratings"}
    </div>
  );
}
