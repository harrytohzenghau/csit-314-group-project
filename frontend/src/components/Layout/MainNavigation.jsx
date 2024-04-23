import { useDispatch, useSelector } from "react-redux";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";
import { getUser } from "../../util/auth";

const MainNavigation = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);

  if (!user) {
    user = getUser();
  }

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
    localStorage.clear();
    dispatch(logout());
  };
  return (
    <header className={classes.header}>
      <nav className={classes["header-wrapper"]}>
        <div className={classes["header-left-wrapper"]}>
          <div className={classes["header-logo"]}>
            <NavLink to={!user || !user.user_admin ? "/" : "user/user-list"}>
              RedDOT Properties
            </NavLink>
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
            {user &&
              ((!user.user_admin && !user.user_agent) || user.user_agent) && (
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
            {user && user.user_admin && (
              <>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="user/user-list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Users
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="user/agent-list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Agents
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="user/admin-list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Admin
                  </NavLink>
                </li>
                <li className={classes["header-list-item"]}>
                  <NavLink
                    to="/property/list"
                    className={({ isActive }) => {
                      return isActive ? classes.active : undefined;
                    }}
                  >
                    Property
                  </NavLink>
                </li>
              </>
            )}
            {user && user.user_agent && (
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
