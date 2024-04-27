import { useState, useEffect } from "react";
import Button from "../UI/Button";
import classes from "./NewProject.module.css";
import HighlightedProject from "./HighlightedProject";
import data from "../../util/DUMMY_PROPERTIES.json";

const MostSaved = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getNewProject = async () => {
      const response = await fetch("http://localhost:3000/api/buy", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setProperties(data.properties.slice(0, 4));
    };

    getNewProject();
  }, []);

  return (
    <div className={`${classes["project-wrapper"]} ${classes["hot-location"]}`}>
      <div className={classes["project-button-wrapper"]}>
        <h2>Most Saved</h2>
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
