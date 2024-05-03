import { useState, useEffect } from "react";
import Button from "../UI/Button";
import classes from "./NewProject.module.css";
import HighlightedProject from "./HighlightedProject";

const MostSaved = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getMostLikedProject = async () => {
      const response = await fetch("http://localhost:3000/api/home", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setProperties(data.mostLiked);
    };

    getMostLikedProject();
  }, []);

  return (
    <div className={`${classes["project-wrapper"]} ${classes["hot-location"]}`}>
      <div className={classes["project-button-wrapper"]}>
        <h2>Most Liked</h2>
        <Button style="underline" type="button">
          View more
        </Button>
      </div>
      <div className={classes["project-card-wrapper"]}>
        {properties &&
          properties.map((p) => (
            <HighlightedProject
              key={p._id}
              id={p._id}
              name={p.property_name}
              property={p.property_propertySchema}
            />
          ))}
      </div>
    </div>
  );
};

export default MostSaved;
