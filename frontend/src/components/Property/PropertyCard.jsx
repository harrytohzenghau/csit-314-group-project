import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./PropertyCard.module.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import Button from "../UI/Button";

const PropertyCard = ({
  property,
  isLiked,
  isSaved,
  likeHandler,
  savedHandler,
}) => {
  const navigate = useNavigate();

  const propertyDetailHandler = (id) => {
    navigate(`/property/${id}`);
  };

  console.log(property.property_images[0]);

  const savedPropertyHandler = async (property_id) => {
    savedHandler(property_id);
  };

  const likePropertyHandler = async (property_id) => {
    likeHandler(property_id);
  };

  return (
    <Card className={classes["card-style"]}>
      <div onClick={() => propertyDetailHandler(property._id)}>
        <img src={`http://localhost:3000/${property.property_images[0]}`} />
      </div>
      <div className={classes["property-card-details-wrapper"]}>
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
        <div className={classes["property-card-action-button"]}>
          <Button
            className={classes["favourite-button"]}
            type="button"
            onClick={() => likePropertyHandler(property._id)}
          >
            {isLiked ? <MdFavorite /> : <MdFavoriteBorder />}
          </Button>
          <Button
            className={classes["favourite-button"]}
            type="button"
            onClick={() => savedPropertyHandler(property._id)}
          >
            {isSaved ? <GoBookmarkFill /> : <GoBookmark />}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
