import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./PropertyCard.module.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Button from "../UI/Button";

const PropertyCard = ({ property, isSaved, savedHandler }) => {
  const navigate = useNavigate();

  const propertyDetailHandler = (id) => {
    navigate(`/property/${id}`);
  };

  const savedPropertyHandler = (id) => {
    savedHandler(id);
  };

  //   console.log(property);
  return (
    <Card className={classes["card-style"]}>
      <div className={classes["property-card-inner-wrapper"]}>
        <h3>{property.property_name}</h3>
        <h4>{property.property_propertySchema.property_location}</h4>
        <div className={classes["property-more-detail"]}>
          <h5>
            {property.property_propertySchema.property_bedroom + " "} bedrooms
          </h5>
          <h5>
            {property.property_propertySchema.property_bathroom + " "}
            bathrooms
          </h5>
          <h5>{property.property_propertySchema.property_PSF + " "} PSF</h5>
        </div>
        <h4>S${" " + property.property_propertySchema.property_price}</h4>
        <Button
          type="button"
          style="underline"
          className={classes["view-more-button"]}
          onClick={() => propertyDetailHandler(property._id)}
        >
          View details
        </Button>
      </div>
      <div>
        <Button
          className={classes["favourite-button"]}
          type="button˝"
          onClick={() => savedPropertyHandler(property._id)}
        >
          {isSaved ? <MdFavorite /> : <MdFavoriteBorder />}
        </Button>
      </div>
    </Card>
  );
};

export default PropertyCard;
