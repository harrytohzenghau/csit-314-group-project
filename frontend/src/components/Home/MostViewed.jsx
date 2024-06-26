import { useEffect, useState } from "react";
import Button from "../UI/Button";
import classes from "./NewProject.module.css";
import HighlightedProject from "./HighlightedProject";

const MostViewed = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getMostViewedProject = async () => {
      const response = await fetch("http://localhost:3000/api/home", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setProperties(data.mostViews);
    };

    getMostViewedProject();
  }, []);

  return (
    <div className={classes["project-wrapper"]}>
      <div className={classes["project-button-wrapper"]}>
        <h2>Most Viewed</h2>
        {/* <Button style="underline" type="button">
          View more
        </Button> */}
      </div>
      <div className={classes["project-card-wrapper"]}>
        {properties &&
          properties.map((p) => (
            <HighlightedProject
              key={p._id}
              id={p._id}
              images={p.property_images}
              name={p.property_name}
              property={p.property_propertySchema}
            />
          ))}
      </div>
    </div>
  );
};

export default MostViewed;
