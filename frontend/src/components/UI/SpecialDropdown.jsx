import { useEffect, useState } from "react";
import classes from "./Dropdown.module.css";

let initial = 0;

function SpecialDropdown({
  title,
  options,
  value,
  selectedHandler,
  defaultValue,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(selectedValue);
    } else if (Array.isArray(value)) {
      setSelectedValue(value[0]);
    }
  }, [selectedValue, value, defaultValue]);

  useEffect(() => {
    selectedHandler(selectedValue);
  }, [selectedHandler, selectedValue]);

  const handleSelectChange = (event) => {
    const option = event.target.selectedOptions[0];
    const extraInfo = option.getAttribute("data-extra-info");
    selectedHandler(event.target.value);
    setSelectedValue(event.target.value)
    setSelectedOption(extraInfo);
  };

  return (
    <div className={classes["dropdown-wrapper"]}>
      <h5>{title}:</h5>
      <select
        className={classes["dropdown-field"]}
        value={defaultValue || selectedValue}
        onChange={handleSelectChange}
      >
        {options.map((option, index) => {
          return (
            <option
              key={option}
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
}

export default SpecialDropdown;
