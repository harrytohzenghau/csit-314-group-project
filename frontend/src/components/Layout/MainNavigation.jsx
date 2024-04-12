import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav className={classes["header-wrapper"]}>
        <div className={classes["header-left-wrapper"]}>
          <div className={classes["header-logo"]}>
            <NavLink to="/">RedDOT Properties</NavLink>
          </div>
          <ul className={classes["header-list"]}>
            <li className={classes["header-list-item"]}>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                Home
              </NavLink>
            </li>
            <li className={classes["header-list-item"]}>
              <NavLink
                to="/property-listing"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                Buys
              </NavLink>
            </li>
            <li className={classes["header-list-item"]}>
              <NavLink
                to="/mortgages"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                Mortgages
              </NavLink>
            </li>
            <li className={classes["header-list-item"]}>
              <NavLink
                to="/saved-listing"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                Saved
              </NavLink>
            </li>
            <li className={classes["header-list-item"]}>
              <NavLink
                to="/your-agent"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                Your Agent
              </NavLink>
            </li>
            <li className={classes["header-list-item"]}>
              <NavLink
                to="/profile"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={classes["header-right-wrapper"]}>
          <ul className={classes["header-list"]}>
            {/* <li className={classes["header-list-item"]}>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive ? classes.active : undefined;
                }}
              >
                Profile
              </NavLink>
            </li> */}
            <li className={classes["header-list-item"]}>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
