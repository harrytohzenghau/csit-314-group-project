import { useEffect, useState } from "react";
import classes from "./Dropdown.module.css";

function Dropdown({ title, options, selectedHandler }) {
  const [selectedOption, setSelectedOption] = useState(options[0] || "");

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
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
