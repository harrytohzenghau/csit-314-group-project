import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./HighlightedProject.module.css";

const HighlightedProject = ({ property }) => {
  const navigate = useNavigate();

  const propertyDetailsHandler = () => {
    navigate(`/property/${property._id}`);
  };

  return (
    <Card className={classes["card-style"]} onClick={propertyDetailsHandler}>
      <img src={property.listing_images[0]} />
      <div className={classes["property-details"]}>
        <h3>{property.listing_propertySchema.property_location}</h3>
        <p>Type: {property.listing_propertySchema.property_type}</p>
        <p>Build year: {property.listing_propertySchema.property_build_year}</p>
      </div>
    </Card>
  );
};
export default HighlightedProject;
