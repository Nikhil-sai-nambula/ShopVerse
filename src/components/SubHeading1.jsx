import { useNavigate } from "react-router-dom";

export default function SubHeading1(props) {
  const navigate = useNavigate();

  const handleclick = (route) => {
    if (!route) {
      if (typeof props.onClick === "function") {
        props.onClick();
      } else {
        console.warn("onClick is not provided or is not a function");
      }
    } else {
      console.log(route);
      navigate(route);
    }
  };

  return (
    <div
      className="sub-heading1"
      style={{ fontSize: props.size }}
      onClick={() => handleclick(props.onclick)}
    >
      {props.value}
    </div>
  );
}
