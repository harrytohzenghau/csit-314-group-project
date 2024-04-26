import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./HighlightedProject.module.css";

const HighlightedProject = ({ id, name, property }) => {
  const navigate = useNavigate();

  const propertyDetailsHandler = () => {
    navigate(`/property/${id}`);
  };

  return (
    <Card className={classes["card-style"]} onClick={propertyDetailsHandler}>
      {/* <img src={property.listing_images[0]} /> */}
      <div className={classes["property-details"]}>
        <h3>{name}</h3>
        <h5>{property.property_location}</h5>
        <p>Type: {property.property_type}</p>
        <p>Build year: {property.property_build_year}</p>
      </div>
    </Card>
  );
};
export default HighlightedProject;
