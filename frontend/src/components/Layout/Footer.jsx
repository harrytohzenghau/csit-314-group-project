import { NavLink } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes["footer-wrapper"]}>
        {/* <div className={classes["footer-wrapper-content"]}>
          <div className={classes["footer-wrapper-item"]}>
            <NavLink>Link 1</NavLink>
            <NavLink>Link 2</NavLink>
            <NavLink>Link 3</NavLink>
          </div>
          <div className={classes["footer-wrapper-item"]}>
            <NavLink>Link 1</NavLink>
            <NavLink>Link 2</NavLink>
            <NavLink>Link 3</NavLink>
          </div>
          <div className={classes["footer-wrapper-item"]}>
            <NavLink>Link 1</NavLink>
            <NavLink>Link 2</NavLink>
            <NavLink>Link 3</NavLink>
          </div>
        </div> */}
        {/* <hr /> */}
        <p className={classes.copyright}>Copyright @ 2024 RedDOT Properties</p>
      </div>
    </footer>
  );
};

export default Footer;
