import { useDispatch, useSelector } from "react-redux";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const [cookie, , removeCookie] = useCookies();
  const [userType, setUserType] = useState(cookie.user_type);

  useEffect(() => {
    setUserType(cookie.user_type);
  }, [cookie]);

  const logoutHandler = async () => {
    // const response = await fetch("http://localhost:3000/api/auth/logout", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: {
    //     _id: user._id,
    //     username: user.user_details.username,
    //   },
    // });

    // const data = await response.json();
    // console.log(data)
    toast.success("Logout successfully");
    removeCookie("id");
    removeCookie("token");
    removeCookie("user_type");
    setUserType("");
    dispatch(logout());
  };
  return (
    <header className={classes.header}>
      <nav className={classes["header-wrapper"]}>
        <div className={classes["header-left-wrapper"]}>
          <div className={classes["header-logo"]}>
            <NavLink
              to={!userType || userType !== "admin" ? "/" : "admin/user-list"}
            >
              RedDOT Properties
            </NavLink>
          </div>
          <ul className={classes["header-list"]}>
            {!userType && (
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
                    to="/property"
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
                    to="/find-agent"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Find Agent
                  </NavLink>
                </li>
              </>
            )}
            {userType &&
              ((userType !== "admin" && userType !== "agent") ||
                userType === "agent") && (
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
            {userType && userType !== "admin" && userType !== "agent" && (
              <>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="/property"
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
                    to="/find-agent"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Find Agent
                  </NavLink>
                </li>
              </>
            )}
            {userType && userType === "admin" && (
              <>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="admin/user-list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Users
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="admin/agent-list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Agents
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="admin/admin-list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Admin
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="/admin/property-list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Property
                  </NavLink>
                </li>
              </>
            )}
            {userType && userType === "agent" && (
              <>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="/agent/property-list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Property List
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="/agent/create-property"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Add Property
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="/agent/manage-rating"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Manage Rating
                  </NavLink>
                </li>
              </>
            )}
            {userType && userType !== "admin" && userType !== "agent" && (
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
            {userType ? (
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
                  <NavLink to="/" onClick={logoutHandler}>
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
