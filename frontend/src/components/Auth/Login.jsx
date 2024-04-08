import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./Login.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const loginSubmitHandler = (e) => {
    e.preventDefault();
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
            label="Username"
            className={classes["input-style"]}
          />
          <Input
            ref={passwordRef}
            type="password"
            label="Password"
            className={classes["input-style"]}
          />
        </div>
        <div className={classes["login-button-wrapper"]}>
          <div className={classes["login-register-button"]}>
            <Button
              style="outline"
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
