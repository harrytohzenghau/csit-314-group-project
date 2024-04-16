import { useDispatch, useSelector } from "react-redux";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className={classes.header}>
      <nav className={classes["header-wrapper"]}>
        <div className={classes["header-left-wrapper"]}>
          <div className={classes["header-logo"]}>
            <NavLink to="/">RedDOT Properties</NavLink>
          </div>
          <ul className={classes["header-list"]}>
            {!user && (
              <>
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
                  // to="/your-agent"
                  // className={({ isActive }) => {
                  //   return isActive ? classes.active : undefined;
                  // }}
                  >
                    Find Agent
                  </NavLink>
                </li>
              </>
            )}
            {user &&
              ((!user.user_admin && !user.user_agent) ||
                user.user_agent) && (
                <>
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
                </>
              )}
            {user && !user.user_admin && !user.user_agent && (
              <>
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
                  // to="/your-agent"
                  // className={({ isActive }) => {
                  //   return isActive ? classes.active : undefined;
                  // }}
                  >
                    Find Agent
                  </NavLink>
                </li>
              </>
            )}
            {user && user.user_admin && (
              <>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="/profile-list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Users
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                  // to="/your-agent"
                  // className={({ isActive }) => {
                  //   return isActive ? classes.active : undefined;
                  // }}
                  >
                    Agents
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                  // to="/your-agent"
                  // className={({ isActive }) => {
                  //   return isActive ? classes.active : undefined;
                  // }}
                  >
                    Admin
                  </NavLink>
                </li>
              </>
            )}
            {user && user.user_agent && (
              <>
                <li className={classes["header-list-item"]}>
                  <NavLink
                  // to="/"
                  // className={({ isActive }) => {
                  //   return isActive ? classes.active : undefined;
                  // }}
                  >
                    Property List
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                  // to="/your-agent"
                  // className={({ isActive }) => {
                  //   return isActive ? classes.active : undefined;
                  // }}
                  >
                    Add Property
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                  // to="/your-agent"
                  // className={({ isActive }) => {
                  //   return isActive ? classes.active : undefined;
                  // }}
                  >
                    Manage Rating
                  </NavLink>
                </li>
              </>
            )}
            {user && !user.user_admin && !user.user_agent && (
              <>
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
                    to="/saved-listing"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Saved
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className={classes["header-right-wrapper"]}>
          <ul className={classes["header-list"]}>
            {user ? (
              <>
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
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="/"
                    onClick={() => {
                      toast.success("Logout successfully");
                      localStorage.clear();
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <li className={classes["header-list-item"]}>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
