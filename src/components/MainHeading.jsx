import { useNavigate } from "react-router-dom";
import "./componentStyles.css";
export default function (props) {
  const navigate = useNavigate();

  const handleclick = (route) => {
    if (route == null) route = "/";
    console.log(route);
    navigate(route);
  };

  return (
    <div
      className="main-heading"
      style={props.style}
      onClick={() => handleclick(props.onClick)}
    >
      {props.value}
    </div>
  );
}
