import classes from "./Divider.module.css";

const Divider = ({ size }) => {
  return <div className={classes[size]}></div>;
};

export default Divider;
