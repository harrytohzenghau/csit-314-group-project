import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const loginPageNavigator = () => {
    navigate("/login");
  };

  const homePageNavigator = () => {
    navigate("/");
  };

  return (
    <form className={classes["register-card-wrapper"]}>
      <Card className={classes["card-style"]}>
        <h2>Register now</h2>
        <h5>Select a user type: </h5>
        <div className={classes["register-user-type-wrapper"]}>
          <Input type="radio" htmlFor="buyer" name="user-type" label="Buyer" />
          <Input
            type="radio"
            htmlFor="seller"
            name="user-type"
            label="Seller"
          />
        </div>
        <div className={classes["register-input-wrapper"]}>
          <div className={classes["register-input-row-wrapper"]}>
            <Input
              type="text"
              label="First Name"
              className={classes["input-style"]}
            />
            <Input
              type="text"
              label="Last Name"
              className={classes["input-style"]}
            />
          </div>
          <div className={classes["register-input-row-wrapper"]}>
            <Input
              type="text"
              label="Username"
              className={classes["input-style"]}
            />
            <Input
              type="email"
              label="Email"
              className={classes["input-style"]}
            />
          </div>
          <div className={classes["register-input-row-wrapper"]}>
            <Input
              type="password"
              label="Password"
              className={classes["input-style"]}
            />
            <Input
              type="password"
              label="Repeat Password"
              className={classes["input-style"]}
            />
          </div>
        </div>
        <div className={classes["register-button-wrapper"]}>
          <div className={classes["register-login-button"]}>
            <Button
              style="outline"
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
