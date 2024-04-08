import { useRef } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./ExtraFilter.module.css";

const ExtraFilter = () => {

  return (
    <div className={classes["extra-filter-wrapper"]}>
      <div className={classes["extra-filter-content"]}>
        <h5>Property Type</h5>
        <div className={classes["extra-filter-field-wrapper"]}>
          <Input
            type="checkbox"
            label="All"
            htmlFor="all"
            name="all"
            defaultChecked={true}
          />
          <Input type="checkbox" label="Condo" htmlFor="condo" name="condo" />
          <Input type="checkbox" label="HDB" htmlFor="hdb" name="hdb" />
          <Input
            type="checkbox"
            label="Landed"
            htmlFor="landed"
            name="landed"
          />
        </div>
      </div>
      <div className={classes["extra-filter-content"]}>
        <h5>Price Range</h5>
        <div className={classes["extra-filter-field-wrapper"]}>
          <Input
            type="radio"
            name="price"
            label="Any"
            htmlFor="any-price"
            defaultChecked={true}
          />
          <Input type="radio" name="price" />
        </div>
      </div>
      <div className={classes["extra-filter-content"]}>
        <h5>Bedroom Number</h5>
        <div className={classes["extra-filter-field-wrapper"]}>
          <Input
            type="checkbox"
            label="Any"
            htmlFor="any"
            name="any"
            defaultChecked={true}
          />
          <Input
            type="checkbox"
            label="Studio"
            htmlFor="studio"
            name="studio"
          />
          <Input type="checkbox" label="1" htmlFor="1" name="1" />
          <Input type="checkbox" label="2" htmlFor="2" name="2" />
          <Input type="checkbox" label="3" htmlFor="3" name="3" />
          <Input type="checkbox" label="4" htmlFor="4" name="4" />
          <Input type="checkbox" label="5" htmlFor="5" name="5" />
        </div>
      </div>
      <div className={classes["extra-filter-button"]}>
        <Button
          style="primary"
          type="submit"
          className={classes["button-style"]}
        >
          Apply
        </Button>
        <Button
          style="secondary"
          type="submit"
          className={classes["button-style"]}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ExtraFilter;
