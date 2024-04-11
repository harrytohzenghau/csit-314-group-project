import classes from "./Button.module.css";

const Button = ({ type, className, style, onClick, children }) => {
  let buttonStyle = "";
  switch (style) {
    case "primary":
      buttonStyle = classes.primary;
      break;
    case "secondary":
      buttonStyle = classes.secondary;
      break;
    case "underline":
      buttonStyle = classes.underline;
      break;
    default:
      break;
  }

  let combinedClass = `${classes.button} ${buttonStyle}`;

  return (
    <button
      type={type}
      className={`${combinedClass} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
