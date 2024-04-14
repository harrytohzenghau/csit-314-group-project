import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./Login.module.css";
import { useRef } from "react";
import { json, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(user);

    // This to be replaced with the below
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    try {
      const data = await response.json();
      const userData = data.user;
      const token = data.token;

      dispatch(login({ user: userData, token }));

      navigate("/");
    } catch (e) {
      throw json({ message: e.message }, { status: 500 });
    }
  };

  const homePageNavigator = () => {
    navigate("/");
  };

  const registerPageNavigator = () => {
    navigate("/register");
  };

  return (
    <form
      className={classes["login-card-wrapper"]}
      onSubmit={loginSubmitHandler}
    >
      <Card className={classes["card-style"]}>
        <h2>Login</h2>
        <div className={classes["login-input-wrapper"]}>
          <Input
            ref={usernameRef}
            type="text"
            name="username"
            label="Username"
            required={true}
            className={classes["input-style"]}
          />
          <Input
            ref={passwordRef}
            type="password"
            name="password"
            label="Password"
            required={true}
            className={classes["input-style"]}
          />
        </div>
        <div className={classes["login-button-wrapper"]}>
          <div className={classes["login-register-button"]}>
            <Button
              style="underline"
              type="button"
              className={classes["register-button-style"]}
              onClick={registerPageNavigator}
            >
              Register
            </Button>
          </div>
          <div className={classes["login-action-button"]}>
            <Button style="primary" type="submit">
              Login
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

export default Login;
