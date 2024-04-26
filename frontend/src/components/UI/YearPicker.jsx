import { useEffect, useState } from "react";
import classes from "./Dropdown.module.css";

function YearPicker({ selectedYear, selectedHandler }) {
  const [years, setYears] = useState(generateYears());

  // useEffect(() => {
  //   if (defaultValue) {
  //     setYears(defaultValue);
  //   }
  // }, [defaultValue]);

  function generateYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 50; year <= currentYear + 20; year++) {
      years.push(year);
    }
    return years;
  }

  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    selectedHandler(selectedYear);
  };

  return (
    <div className={classes["dropdown-wrapper"]}>
      <h5>Year built:</h5>
      <select
        className={classes["dropdown-field"]}
        value={selectedYear}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YearPicker;
