import { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./SearchBar.module.css";
import ExtraFilter from "./ExtraFilter";
import { useNavigate, useMatch, useLocation } from "react-router-dom";

const SearchBar = ({ className, defaultText }) => {
  const searchRef = useRef();
  const [showFilter, setShowFilter] = useState();

  const navigate = useNavigate();

  const toggleExtraFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchRef.current.value);

    navigate(`/property?property_name=${searchRef.current.value}`);
  };

  const searchWithFilterHandler = (
    property_type,
    price_min,
    price_max,
    property_bedroom
  ) => {
    navigate(
      `/property?property_name=${searchRef.current.value}&property_type=${property_type}&property_bedroom=${property_bedroom}&price_min=${price_min}&price_max=${price_max}`
    );
  };

  return (
    <Card className={`${classes["card-style"]} ${classes[className]}`}>
      <form onSubmit={submitHandler}>
        <div className={classes["search-wrapper"]}>
          <Input
            ref={searchRef}
            type="text"
            className={classes["input-style"]}
            defaultValue={defaultText || ""}
            placeholder="Search for your desired home"
          />
          <Button
            type="submit"
            className={classes["button-style"]}
            style="primary"
          >
            Search
          </Button>
        </div>
        <div className={classes["extra-filter-wrapper"]}>
          <Button type="button" style="underline" onClick={toggleExtraFilter}>
            {showFilter ? "Hide filter" : "More filter"}
          </Button>
        </div>
        {showFilter && (
          <ExtraFilter searchWithFilterHandler={searchWithFilterHandler} />
        )}
      </form>
    </Card>
  );
};

export default SearchBar;
