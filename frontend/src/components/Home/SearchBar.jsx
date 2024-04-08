import { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./SearchBar.module.css";
import ExtraFilter from "./ExtraFilter";

const SearchBar = () => {
  const searchRef = useRef();
  const [showFilter, setShowFilter] = useState();

  const toggleExtraFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchRef.current.value);
  };

  return (
    <Card className={classes["card-style"]}>
      <form onSubmit={submitHandler}>
        <div className={classes["search-wrapper"]}>
          <Input
            ref={searchRef}
            type="text"
            className={classes["input-style"]}
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
          <Button type="button" style="outline" onClick={toggleExtraFilter}>
            {showFilter ? "Hide filter" : "More filter"}
          </Button>
        </div>
        {showFilter && <ExtraFilter />}
      </form>
    </Card>
  );
};

export default SearchBar;
