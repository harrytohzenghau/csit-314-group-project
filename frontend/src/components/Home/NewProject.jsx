import { useEffect } from "react";
import Button from "../UI/Button";
import classes from "./NewProject.module.css";
import HighlightedProject from "./HighlightedProject";
import data from "../../util/DUMMY_PROPERTIES.json";

const NewProject = () => {
  useEffect(() => {
    const getNewProject = async () => {
      //   const response = await fetch("http://localhost:3000/api/property", {
      //     method: "GET",
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //   });
      //   const data = await response.json();
      //   console.log(data);
    };

    getNewProject();
  }, []);

  return (
    <div className={classes["project-wrapper"]}>
      <div className={classes["project-button-wrapper"]}>
        <h2>Latest Project</h2>
        <Button style="underline" type="button">
          View more
        </Button>
      </div>
      <div className={classes["project-card-wrapper"]}>
        {data.map((d) => (
          <HighlightedProject key={d._id} property={d} />
        ))}
      </div>
    </div>
  );
};

export default NewProject;
