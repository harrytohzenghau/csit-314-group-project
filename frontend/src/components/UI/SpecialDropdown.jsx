import { useEffect, useState } from "react";
import classes from "./Dropdown.module.css";

const SpecialDropdown = ({
  title,
  options,
  value,
  selectedHandler,
  disabled,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedValue(value[0]);
    }
  }, [selectedValue, value]);

  useEffect(() => {
    selectedHandler(selectedValue);
    setSelectedValue(selectedValue);
  }, [selectedHandler, selectedValue]);

  const handleSelectChange = (event) => {
    selectedHandler(event.target.selectedOptions[0].getAttribute("value"));
    setSelectedValue(event.target.selectedOptions[0].getAttribute("value"));
  };

  return (
    <div className={classes["dropdown-wrapper"]}>
      <h5>{title}:</h5>
      <select
        className={classes["dropdown-field"]}
        value={selectedValue || value[0]}
        onChange={handleSelectChange}
        disabled={disabled}
      >
        {options.map((option, index) => {
          return (
            <option
              key={value[index]}
              value={value[index]}
              data-extra-info={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SpecialDropdown;
