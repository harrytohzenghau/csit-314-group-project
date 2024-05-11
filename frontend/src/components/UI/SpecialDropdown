import { useEffect, useState } from "react";
import classes from "./Dropdown.module.css";

function SpecialDropdown({ title, options, value, selectedHandler, defaultValue }) {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    } else if (Array.isArray(value)) {
      setSelectedOption(value[0]);
    }
  }, [value, defaultValue]);

  useEffect(() => {
    selectedHandler(selectedOption);
  }, [selectedHandler, selectedOption]);

  const handleSelectChange = (event) => {
    selectedHandler(event.target.value);
    setSelectedOption(event.target.value);
  };

  return (
    <div className={classes["dropdown-wrapper"]}>
      <h5>{title}:</h5>
      <select
        className={classes["dropdown-field"]}
        value={defaultValue || selectedOption}
        onChange={handleSelectChange}
      >
        {options.map((option, index) => {
          return (
            <option key={option} value={value ? value[index] : option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SpecialDropdown;
