import { useRef } from "react";
import { useNavigate, json } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./Register.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginPageNavigator = () => {
    navigate("/login");
  };

  const homePageNavigator = () => {
    navigate("/");
  };

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // This to be replaced with the below
    // const response = await fetch("http://localhost:8080/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });

    // if (!response.ok) {
    //   throw json({ message: "Could not create user" }, { status: 500 });
    // }

    // try {
    //   const data = await response.json();
    //   const userData = data.user;
    //   const token = data.token;

    //   dispatch({ user: userData, token });

    //   navigate("/");
    // } catch (e) {
    //   throw json({ message: e.message }, { status: 500 });
    // }

    // Below to be replaced with the above
    const token = "dummy_token";
    localStorage.setItem("token", token);
    dispatch(login({ user, token }));
    navigate("/");
  };

  return (
    <form
      className={classes["register-card-wrapper"]}
      onSubmit={registerSubmitHandler}
    >
      <Card className={classes["card-style"]}>
        <h2>Register now</h2>
        <div className={classes["register-input-wrapper"]}>
          <div className={classes["register-input-row-wrapper"]}>
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
          <div className={classes["register-input-row-wrapper"]}>
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
          <div className={classes["register-input-row-wrapper"]}>
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
        <div className={classes["register-button-wrapper"]}>
          <div className={classes["register-login-button"]}>
            <Button
              style="underline"
              type="button"
              className={classes["login-button-style"]}
              onClick={loginPageNavigator}
            >
              Login
            </Button>
          </div>
          <div className={classes["register-action-button"]}>
            <Button style="primary" type="submit">
              Register
            </Button>
            <Button style="secondary" type="button" onClick={homePageNavigator}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default Register;
