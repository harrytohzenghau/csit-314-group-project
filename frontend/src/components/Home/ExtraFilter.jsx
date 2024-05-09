import { useRef, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./ExtraFilter.module.css";

const ExtraFilter = ({ searchWithFilterHandler }) => {
  const allPropertyRef = useRef();
  const condoRef = useRef();
  const hdbRef = useRef();
  const landedRef = useRef();
  const allPriceRef = useRef();
  const customPriceRef = useRef();
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const allBedroomRef = useRef();
  const studioRef = useRef();
  const oneBedroomRef = useRef();
  const twoBedroomRef = useRef();
  const threeBedroomRef = useRef();
  const fourBedroomRef = useRef();
  const fiveBedroomRef = useRef();

  const [enablePriceInput, setEnablePriceInput] = useState(false);

  const togglePriceInput = (status) => {
    if (!status) {
      minPriceRef.current.value = "";
      maxPriceRef.current.value = "";
    }
    setEnablePriceInput(status);
  };

  const resetFilterHandler = () => {
    allPropertyRef.current.checked = true;
    condoRef.current.checked = false;
    hdbRef.current.checked = false;
    landedRef.current.checked = false;
    allPriceRef.current.checked = true;
    customPriceRef.current.checked = false;
    minPriceRef.current.value = "";
    maxPriceRef.current.value = "";
    allBedroomRef.current.checked = true;
    studioRef.current.checked = false;
    oneBedroomRef.current.checked = false;
    twoBedroomRef.current.checked = false;
    threeBedroomRef.current.checked = false;
    fourBedroomRef.current.checked = false;
    fiveBedroomRef.current.checked = false;
  };

  const applyFilterHandler = () => {
    let property_type = "";
    if (condoRef.current.checked) {
      property_type = "Condo";
    } else if (hdbRef.current.checked) {
      property_type = "Hdb";
    } else if (landedRef.current.checked) {
      property_type = "Landed";
    }

    let price_min = "";
    let price_max = "";
    if (customPriceRef.current.checked) {
      price_min = minPriceRef.current.value;
      price_max = maxPriceRef.current.value;
    }

    let property_bedroom = "";
    if (studioRef.current.checked) {
      property_bedroom = "studio";
    } else if (oneBedroomRef.current.checked) {
      property_bedroom = "1";
    } else if (twoBedroomRef.current.checked) {
      property_bedroom = "2";
    } else if (threeBedroomRef.current.checked) {
      property_bedroom = "3";
    } else if (fourBedroomRef.current.checked) {
      property_bedroom = "4";
    } else if (fiveBedroomRef.current.checked) {
      property_bedroom = "5";
    }
    searchWithFilterHandler(
      property_type,
      price_min,
      price_max,
      property_bedroom
    );
  };

  return (
    <div className={classes["extra-filter-wrapper"]}>
      <div className={classes["extra-filter-content"]}>
        <h5>Property Type</h5>
        <div className={classes["extra-filter-field-wrapper"]}>
          <Input
            ref={allPropertyRef}
            type="radio"
            label="All"
            htmlFor="all"
            name="property"
            defaultChecked={true}
          />
          <Input
            ref={condoRef}
            type="radio"
            label="Condo"
            htmlFor="condo"
            name="property"
          />
          <Input
            ref={hdbRef}
            type="radio"
            label="HDB"
            htmlFor="hdb"
            name="property"
          />
          <Input
            ref={landedRef}
            type="radio"
            label="Landed"
            htmlFor="landed"
            name="property"
          />
        </div>
      </div>
      <div className={classes["extra-filter-content"]}>
        <h5>Price Range</h5>
        <div
          className={`${classes["extra-filter-field-wrapper"]} ${classes["custom"]}`}
        >
          <Input
            ref={allPriceRef}
            type="radio"
            name="price"
            label="Any"
            htmlFor="any-price"
            defaultChecked={true}
            onClick={() => togglePriceInput(false)}
          />
          <div className={classes["extra-filter-price-range"]}>
            <Input
              ref={customPriceRef}
              type="radio"
              name="price"
              onClick={() => togglePriceInput(true)}
            />
            <Input
              ref={minPriceRef}
              type="number"
              name="min"
              placeholder="Min. price"
              disabled={!enablePriceInput}
            />
            <Input
              ref={maxPriceRef}
              type="number"
              name="max"
              placeholder="Max. price"
              disabled={!enablePriceInput}
            />
          </div>
        </div>
      </div>
      <div className={classes["extra-filter-content"]}>
        <h5>Bedroom Number</h5>
        <div className={classes["extra-filter-field-wrapper"]}>
          <Input
            ref={allBedroomRef}
            type="radio"
            label="Any"
            htmlFor="any"
            name="bedroom"
            defaultChecked={true}
          />
          <Input
            ref={studioRef}
            type="radio"
            label="Studio"
            htmlFor="studio"
            name="bedroom"
          />
          <Input
            ref={oneBedroomRef}
            type="radio"
            label="1"
            htmlFor="1"
            name="1bedroom"
          />
          <Input
            ref={twoBedroomRef}
            type="radio"
            label="2"
            htmlFor="2"
            name="bedroom"
          />
          <Input
            ref={threeBedroomRef}
            type="radio"
            label="3"
            htmlFor="3"
            name="bedroom"
          />
          <Input
            ref={fourBedroomRef}
            type="radio"
            label="4"
            htmlFor="4"
            name="bedroom"
          />
          <Input
            ref={fiveBedroomRef}
            type="radio"
            label="5"
            htmlFor="5"
            name="bedroom"
          />
        </div>
      </div>
      <div className={classes["extra-filter-button"]}>
        <Button
          style="primary"
          type="button"
          className={classes["button-style"]}
          onClick={applyFilterHandler}
        >
          Apply
        </Button>
        <Button
          style="secondary"
          type="button"
          className={classes["button-style"]}
          onClick={resetFilterHandler}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ExtraFilter;
