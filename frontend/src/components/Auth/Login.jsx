import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./Login.module.css";
import { useRef } from "react";
import { json, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [, setCookie] = useCookies(["id", "token", "user_type"]);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const data = await response.json();
      toast.error(data.error);
      return;
    }

    const data = await response.json();
    const userId = data.id;
    const token = data.token;

    setCookie("id", userId);
    setCookie("token", token);

    const userData_response = await fetch(
      `http://localhost:3000/api/profile/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const userData = await userData_response.json();

    let user_type;
    if (userData.profile.user_admin) {
      user_type = "admin";
    } else if (userData.profile.user_agent) {
      user_type = "agent";
    } else {
      user_type = "user";
    }

    setCookie("user_type", user_type);

    dispatch(login({ user: userData, token }));

    toast.success("Login successfully");

    if (userData.user_admin) {
      navigate("/admin/user-list");
    } else {
      navigate("/");
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
