import { useRef } from "react";
import { useNavigate, json } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./Register.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileNumberRef = useRef();
  const repeatPasswordRef = useRef();

  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies();

  const dispatch = useDispatch();

  const loginPageNavigator = () => {
    navigate("/login");
  };

  const homePageNavigator = () => {
    navigate("/");
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
      user_admin: false,
      user_agent: false,
    };

    const register_response = await fetch(
      "http://localhost:3000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!register_response.ok) {
      toast.error(
        "Something went wrong while trying to create your account. Please try again."
      );
      return;
    }

    try {
      const login_response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );

      if (!login_response.ok) {
        toast.error("Something went wrong. Please try again");
        return;
      }

      try {
        const data = await login_response.json();
        const userId = data.id;
        const token = data.token;

        setCookie("id", userId);
        setCookie("username", usernameRef.current.value);
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

        toast.success("Account created successfully");

        navigate("/");
      } catch (e) {
        throw json({ message: e.message }, { status: 500 });
      }
    } catch (e) {
      throw json({ message: e.message }, { status: 500 });
    }
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
            />
            <Input
              ref={lastNameRef}
              required={true}
              name="lastName"
              type="text"
              label="Last Name"
            />
          </div>
          <div className={classes["register-input-row-wrapper"]}>
            <Input
              ref={usernameRef}
              required={true}
              name="username"
              type="text"
              label="Username"
            />
            <Input
              ref={emailRef}
              required={true}
              name="email"
              type="email"
              label="Email"
            />
          </div>
          <div className={classes["register-input-row-wrapper"]}>
            <Input
              ref={mobileNumberRef}
              required={true}
              name="mobile"
              type="tel"
              label="Mobile number"
            />
            <div></div>
          </div>
          <div className={classes["register-input-row-wrapper"]}>
            <Input
              ref={passwordRef}
              required={true}
              name="password"
              type="password"
              label="Password"
            />
            <Input
              ref={repeatPasswordRef}
              type="password"
              label="Repeat Password"
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
