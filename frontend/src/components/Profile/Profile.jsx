import { useEffect, useRef, useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

const Profile = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const mobileNumberRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const [cookie, setCookie] = useCookies();
  const userId = cookie.id;
  const token = cookie.token;

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `http://localhost:3000/api/profile/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();

      setUser(data.profile.user_details);
    };

    getUser();
  }, [userId]);

  const [showEditPassword, setShowEditPassword] = useState(false);

  const toggleEditPassword = () => {
    setShowEditPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const editProfileHandler = async (e) => {
    e.preventDefault();

    const userData = {
      user_details: {
        first_name: firstNameRef.current.value || user.first_name,
        last_name: lastNameRef.current.value || user.last_name,
        username: user.username,
        mobile_number: mobileNumberRef.current.value || user.mobile_number,
        email_address: emailRef.current.value || user.email_address,
      }
    };

    if (showEditPassword) {
      if (passwordRef.current.value !== repeatPasswordRef.current.value) {
        toast.error("Password does not matched. Please try again");
        return;
      }

      userData.user_details.password = passwordRef.current.value;
    }

    const response = await fetch(`http://localhost:3000/api/profile/${userId}`, {
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

    toast.success("Profile updated successfully");

    if (userData.user_admin) {
      navigate("/admin/user-list");
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
              defaultValue={user.first_name}
            />
            <Input
              ref={lastNameRef}
              required={true}
              name="lastName"
              type="text"
              label="Last Name"
              defaultValue={user.last_name}
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
              defaultValue={user.username}
            />
            <Input
              ref={emailRef}
              required={true}
              name="email"
              type="email"
              label="Email"
              defaultValue={user.email_address}
            />
          </div>
          <div className={classes["profile-input-wrapper"]}>
            <Input
              ref={mobileNumberRef}
              required={true}
              name="mobile"
              type="tel"
              label="Mobile number"
              defaultValue={user.mobile_number}
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
