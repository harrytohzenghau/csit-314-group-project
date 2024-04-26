import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./PropertyDetail.module.css";
import { MdBed } from "react-icons/md";
import { PiToiletFill } from "react-icons/pi";
import { RxSize } from "react-icons/rx";
import { MdStar } from "react-icons/md";
import Button from "../UI/Button";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/buy/${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch property data");
        }
        const data = await response.json();
        setProperty(data.property);
        console.log(data.property.property_agentSchema);
        setAgent(data.property.property_agentSchema);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchProperty();
  }, [id]);

  return (
    <Card className={classes["card-style"]}>
      <div></div>
      <div className={classes["property-all-detail-wrapper"]}>
        <div className={classes["proprety-all-detail-outer-wrapper"]}>
          <div className={classes["property-detail-content-wrapper"]}>
            <div className={classes["property-detail-wrapper"]}>
              <h4>{property && property.property_name}</h4>
              <h5>
                {property && property.property_propertySchema.property_location}
              </h5>
              <hr />
            </div>
          </div>
          <div className={classes["property-detail-content-wrapper"]}>
            <div className={classes["property-detail-wrapper"]}>
              <div className={classes["property-detail-wrapper"]}>
                <div className={classes["property-price-and-detail-wrapper"]}>
                  <div
                    className={
                      classes["property-price-and-detail-inner-wrapper"]
                    }
                  >
                    <h4>
                      S$ &nbsp;
                      {property &&
                        property.property_propertySchema.property_price}
                    </h4>
                  </div>
                  <div
                    className={
                      classes["property-price-and-detail-inner-wrapper"]
                    }
                  >
                    <div className={classes["property-detail-inner-wrapper"]}>
                      <MdBed />
                      <h4>
                        {property &&
                          property.property_propertySchema.property_bedroom}
                        &nbsp; bedrooms
                      </h4>
                    </div>
                    <div className={classes["property-detail-inner-wrapper"]}>
                      <PiToiletFill />
                      <h4>
                        {property &&
                          property.property_propertySchema.property_bathroom}
                        &nbsp; bathrooms
                      </h4>
                    </div>
                    <div className={classes["property-detail-inner-wrapper"]}>
                      <RxSize />
                      <h4>
                        {property &&
                          property.property_propertySchema.property_PSF}
                        &nbsp; PSF
                      </h4>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className={classes["property-detail-content-wrapper"]}>
            <div className={classes["property-detail-wrapper"]}>
              <h4>More Details</h4>
              <div className={classes["property-more-detail-wrapper"]}>
                <div className={classes["property-more-detail-inner-wrapper"]}>
                  <div
                    className={
                      classes["property-more-detail-individual-wrapper"]
                    }
                  >
                    <h5>Type:</h5>
                    <p>
                      {property &&
                        property.property_propertySchema.property_type}
                    </p>
                  </div>
                  <div
                    className={
                      classes["property-more-detail-individual-wrapper"]
                    }
                  >
                    <h5>Floor Size:</h5>
                    <p>
                      {property &&
                        property.property_propertySchema.property_floor_size}
                    </p>
                  </div>
                  <div
                    className={
                      classes["property-more-detail-individual-wrapper"]
                    }
                  >
                    <h5>Tenure:</h5>
                    <p>
                      {property &&
                        property.property_propertySchema.property_tenure}
                    </p>
                  </div>
                </div>
                <div className={classes["property-more-detail-inner-wrapper"]}>
                  <div
                    className={
                      classes["property-more-detail-individual-wrapper"]
                    }
                  >
                    <h5>Build year:</h5>
                    <p>
                      {property &&
                        property.property_propertySchema.property_build_year}
                    </p>
                  </div>
                  <div
                    className={
                      classes["property-more-detail-individual-wrapper"]
                    }
                  >
                    <h5>Floor level:</h5>
                    <p>
                      {property &&
                        property.property_propertySchema.property_floor_level}
                    </p>
                  </div>
                  <div
                    className={
                      classes["property-more-detail-individual-wrapper"]
                    }
                  >
                    <h5>Furnishing:</h5>
                    <p>
                      {property &&
                        property.property_propertySchema.property_furnishing}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["proprety-all-detail-outer-wrapper"]}>
          <Card className={classes["inner-card-style"]}>
            <div>
              <h5>
                Agent name: &nbsp;
                {agent &&
                  agent.agent_userSchema.user_details.first_name +
                    " " +
                    agent.agent_userSchema.user_details.last_name}
              </h5>
              <h5 style={{ display: "flex", alignItems: "center" }}>
                Review: {agent && agent.agent_rating} <MdStar />
              </h5>
            </div>
            <Button type="button" style="secondary">
              <a
                href={`mailto:${
                  agent && agent.agent_userSchema.user_details.email_address
                }`}
              >
                Contact me
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default PropertyDetail;
