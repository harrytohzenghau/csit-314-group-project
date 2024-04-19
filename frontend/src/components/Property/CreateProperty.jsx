import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./CreateProperty.module.css";
import { toast } from "react-hot-toast";

const CreateProperty = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileNumberRef = useRef();
  const repeatPasswordRef = useRef();
  const adminRef = useRef();
  const agentRef = useRef();

  const navigate = useNavigate();

  const profileListPageNavigator = () => {
    navigate("/property/list");
  };

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    if (!/^\d*\.?\d*$/.test(mobileNumberRef.current.value)) {
      toast.error("Invalid value detected in mobile number field.");
      return;
    }

    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      toast.error("Password does not matched. Please try again");
      return;
    }

    const user = {
      user_details: {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        username: usernameRef.current.value,
        mobile_number: mobileNumberRef.current.value,
        email_address: emailRef.current.value,
        password: passwordRef.current.value,
      },
      user_admin: adminRef.current.checked,
      user_agent: agentRef.current.checked,
    };

    const token = localStorage.getItem("token");

    let endpoint = "http://localhost:3000/api/auth/register/";

    if (user.user_admin) {
      endpoint += "admin";
    } else if (user.user_agent) {
      endpoint += "agent";
    } else {
      endpoint += "user";
    }

    const register_response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!register_response.ok) {
      toast.error(
        "Something went wrong while trying to create a property. Please try again."
      );
      return;
    }

    toast.success("Property created successfully");
    navigate("/property/list");
  };

  return (
    <form
      className={classes["create-property-card-wrapper"]}
      onSubmit={registerSubmitHandler}
    >
      <Card className={classes["card-style"]}>
        <h2>Create Property</h2>
        <div className={classes["create-property-input-wrapper"]}>
          <h5>Type of account</h5>
          <div className={classes["create-property-type-wrapper"]}>
            <Input
              name="user-type"
              type="radio"
              htmlFor="user"
              label="User"
              defaultChecked={true}
            />
            <Input
              ref={adminRef}
              name="user-type"
              type="radio"
              htmlFor="admin"
              label="Admin"
            />
            <Input
              ref={agentRef}
              name="user-type"
              type="radio"
              htmlFor="agent"
              label="Agent"
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={firstNameRef}
              required={true}
              name="firstName"
              type="text"
              label="First Name"
              className={classes["input-style"]}
            />
            <Input
              ref={lastNameRef}
              required={true}
              name="lastName"
              type="text"
              label="Last Name"
              className={classes["input-style"]}
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={usernameRef}
              required={true}
              name="username"
              type="text"
              label="Username"
              className={classes["input-style"]}
            />
            <Input
              ref={emailRef}
              required={true}
              name="email"
              type="email"
              label="Email"
              className={classes["input-style"]}
            />
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={mobileNumberRef}
              required={true}
              name="mobile"
              type="tel"
              label="Mobile number"
              className={classes["input-style"]}
            />
            <div></div>
          </div>
          <div className={classes["create-property-input-row-wrapper"]}>
            <Input
              ref={passwordRef}
              required={true}
              name="password"
              type="password"
              label="Password"
              className={classes["input-style"]}
            />
            <Input
              ref={repeatPasswordRef}
              type="password"
              label="Repeat Password"
              className={classes["input-style"]}
            />
          </div>
        </div>
        <div className={classes["create-property-button-wrapper"]}>
          <div className={classes["create-property-action-button"]}>
            <Button style="primary" type="submit">
              Create
            </Button>
            <Button
              style="secondary"
              type="button"
              onClick={profileListPageNavigator}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default CreateProperty;
