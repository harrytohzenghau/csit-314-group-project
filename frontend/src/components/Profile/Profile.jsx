import { useRef, useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getToken, getUser } from "../../util/auth";

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

  const user = getUser();
  const token = getToken();

  const editProfileHandler = async (e) => {
    e.preventDefault();

    const userData = {
      _id: user._id,
      user_details: {
        first_name: firstNameRef.current.value || user.user_details.first_name,
        last_name: lastNameRef.current.value || user.user_details.last_name,
        username: user.user_details.username,
        mobile_number:
          mobileNumberRef.current.value || user.user_details.mobile_number,
        email_address:
          emailRef.current.value || user.user_details.email_address,
      },
      user_admin: user.user_admin,
      user_agent: user.user_agent,
    };

    if (showEditPassword) {
      if (passwordRef.current.value !== repeatPasswordRef.current.value) {
        toast.error("Password does not matched. Please try again");
        return;
      }

      userData.user_details.password = passwordRef.current.value;
    }

    const response = await fetch("http://localhost:3000/api/admin", {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      toast.error("Something went wrong while updating the profile.");
      return;
    }

    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Profile updated successfully");

    if (userData.user_admin) {
      navigate("/user/user-list");
    } else {
      navigate("/");
    }
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
              disabled={true}
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
