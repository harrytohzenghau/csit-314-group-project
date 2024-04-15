import { useRef } from "react";
import { useNavigate, json } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "../Auth/Register.module.css";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../../store/authSlice";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileNumberRef = useRef();
  const repeatPasswordRef = useRef();
  const adminRef = useRef()
  const agentRef = useRef()

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const profileListPageNavigator = () => {
    navigate("/profile-list");
  };

  const registerSubmitHandler = async (e) => {
    
    e.preventDefault();

    const user = {
      user_details: {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        username: usernameRef.current.value,
        mobile_number: mobileNumberRef.current.value,
        email_address: emailRef.current.value,
        password: passwordRef.current.value,
      },
      user_admin: adminRef.current.value,
      user_agent: agentRef.current.value,
    };

    console.log(user)

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
    /*
    try {
      const login_response = await fetch(
        "http://127.0.0.1:3000/api/auth/login",
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
        const userData = data.user;
        const token = data.token;

        dispatch(login({ user: userData, token }));

        toast.success("Account created successfully");

        navigate("/");
      } catch (e) {
        throw json({ message: e.message }, { status: 500 });
      }
    } catch (e) {
      throw json({ message: e.message }, { status: 500 });
    }*/
  };

  return (
    <form
      className={classes["register-card-wrapper"]}
      onSubmit={registerSubmitHandler}
    >
      <Card className={classes["card-style"]}>
        <h2>Register now</h2>
        <div className={classes["register-input-wrapper"]}>
          <div>
            <h5>Type of account</h5>
            <p>
            <label>
            <Input
              ref={adminRef}
              name="user-type"
              type="radio"
              label="First Name"
            />Admin
            </label>
            <label>
            <Input
              ref={agentRef}
              name="user-type"
              type="radio"
              label="First Name"
            />Agent
            </label>
            <label>
            <Input
              name="user-type"
              type="radio"
              label="First Name"
            />Regular User
            </label>
            </p>
          </div>
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
              ref={mobileNumberRef}
              required={true}
              name="mobile"
              type="tel"
              label="Mobile number"
              className={classes["input-style"]}
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
          
          <div className={classes["register-action-button"]}>
            <Button style="primary" type="submit">
              Register
            </Button>
            <Button style="secondary" type="button" onClick={profileListPageNavigator}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default Register;
