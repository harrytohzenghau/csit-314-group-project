import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef(
  ({ type, label, placeholder, name, htmlFor, className, ...props }, ref) => {
    if (type === "text" || type === "password" || type === "email" || type === "tel") {
      return (
        <div className={`${classes["input-wrapper"]} ${classes["text"]}`}>
          {label && <label htmlFor={label}>{label}</label>}
          <input
            ref={ref}
            name={name}
            type={type}
            placeholder={placeholder}
            className={`${classes["input-text"]} ${className || ""}`}
            {...props}
          />
        </div>
      );
    } else if (type === "radio") {
      return (
        <div className={`${classes["input-wrapper"]} ${classes["radio"]}`}>
          <input ref={ref} type={type} name={name} id={htmlFor} {...props} />
          {htmlFor && <label htmlFor={htmlFor}>{label}</label>}
        </div>
      );
    } else if (type === "checkbox") {
      return (
        <div className={`${classes["input-wrapper"]} ${classes["checkbox"]}`}>
          <input ref={ref} type={type} name={name} id={htmlFor} {...props} />
          {htmlFor && <label htmlFor={htmlFor}>{label}</label>}
        </div>
      );
    }
  }
);

Input.displayName = "Input";

export default Input;
