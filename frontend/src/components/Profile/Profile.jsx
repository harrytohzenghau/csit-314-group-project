import { useRef, useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./Profile.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const mobileNumberRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const [showEditPassword, setShowEditPassword] = useState(false);

  const toggleEditPassword = () => {
    setShowEditPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();

  let user = useSelector((state) => state.auth.user);

  if (!user) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const editProfileHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={editProfileHandler}
      className={classes["profile-card-wrapper"]}
    >
      <Card className={classes["card-style"]}>
        <h2>Profile</h2>
        <div className={classes["profile-details-wrapper"]}>
          <div className={classes["profile-input-wrapper"]}>
            <Input
              ref={firstNameRef}
              required={true}
              name="firstName"
              type="text"
              label="First Name"
              defaultValue={user.user_details.first_name}
            />
            <Input
              ref={lastNameRef}
              required={true}
              name="lastName"
              type="text"
              label="Last Name"
              defaultValue={user.user_details.last_name}
            />
          </div>
          <div className={classes["profile-input-wrapper"]}>
            <Input
              ref={usernameRef}
              required={true}
              name="username"
              type="text"
              label="Username"
              defaultValue={user.user_details.username}
            />
            <Input
              ref={emailRef}
              required={true}
              name="email"
              type="email"
              label="Email"
              defaultValue={user.user_details.email_address}
            />
          </div>
          <div className={classes["profile-input-wrapper"]}>
            <Input
              ref={mobileNumberRef}
              required={true}
              name="mobile"
              type="tel"
              label="Mobile number"
              defaultValue={user.user_details.mobile_number}
            />
            <div></div>
          </div>
          <div>
            <Button
              style="underline"
              type="button"
              onClick={toggleEditPassword}
              className={classes["profile-edit-password-button"]}
            >
              {showEditPassword ? "Cancel" : "Edit Password"}
            </Button>
          </div>
          {showEditPassword && (
            <div className={classes["profile-input-wrapper"]}>
              <Input
                ref={passwordRef}
                required={true}
                name="password"
                type="password"
                label="Password"
              />
              <Input
                ref={repeatPasswordRef}
                required={true}
                name="repeatPassword"
                type="password"
                label="Repeat Password"
              />
            </div>
          )}
        </div>
        <div className={classes["profile-button-wrapper"]}>
          <div className={classes["profile-action-button"]}>
            <Button style="primary" type="submit">
              Update
            </Button>
            <Button
              style="secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default Profile;