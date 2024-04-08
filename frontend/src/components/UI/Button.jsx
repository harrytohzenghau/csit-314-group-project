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
    case "outline":
      buttonStyle = classes.outline;
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
