import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./HighlightedProject.module.css";

const HighlightedProject = ({ id, name, images, property }) => {
  const navigate = useNavigate();

  const propertyDetailsHandler = () => {
    navigate(`/property/${id}`);
  };

  return (
    <Card className={classes["card-style"]} onClick={propertyDetailsHandler}>
      <img src={`http://localhost:3000/${images[0]}`} />
      <div className={classes["property-details"]}>
        <h3>{name}</h3>
        <h5>Type: {property.property_type}</h5>
        <h5>Build year: {property.property_build_year}</h5>
      </div>
    </Card>
  );
};
export default HighlightedProject;
