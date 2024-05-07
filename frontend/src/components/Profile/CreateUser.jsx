import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "../Profile/CreateUser.module.css";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

const CreateUser = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileNumberRef = useRef();
  const repeatPasswordRef = useRef();
  const adminRef = useRef();
  const agentRef = useRef();

  const [cookie] = useCookies();

  const navigate = useNavigate();

  const profileListPageNavigator = () => {
    navigate("/admin/user-list");
  };

  const createUserSubmitHandler = async (e) => {
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

    const token = cookie.token;

    const register_response = await fetch("http://localhost:3000/api/admin", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!register_response.ok) {
      toast.error(
        "Something went wrong while trying to create your account. Please try again."
      );
      return;
    }

    toast.success("Account created successfully");
    navigate(-1);
  };

  return (
    <form
      className={classes["create-user-card-wrapper"]}
      onSubmit={createUserSubmitHandler}
    >
      <Card className={classes["card-style"]}>
        <h2>Create User</h2>
        <div className={classes["create-user-input-wrapper"]}>
          <h5>Type of account</h5>
          <div className={classes["create-user-type-wrapper"]}>
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
          <div className={classes["create-user-input-row-wrapper"]}>
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
          <div className={classes["create-user-input-row-wrapper"]}>
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
          <div className={classes["create-user-input-row-wrapper"]}>
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
          <div className={classes["create-user-input-row-wrapper"]}>
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
        <div className={classes["create-user-button-wrapper"]}>
          <div className={classes["create-user-action-button"]}>
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

export default CreateUser;
