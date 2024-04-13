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

    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        // This to be replaced with the below
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user),
        });

        // if (!response.ok) {
        //     throw json(
        //         { message: "Could not authenticate user" },
        //         { status: 500 }
        //     );
        // }

        console.log(response);

        try {
            const data = await response.json();
            console.log(data.token);

            const userData = data.user;
            const token = data.token;

            dispatch(login({ user: userData, token }));

            navigate("/");
        } catch (e) {
            // throw json({ message: e.message }, { status: 500 });
        }

        // Below to be replaced with the above
        // const token = "dummy_token";
        // localStorage.setItem("token", token);
        // dispatch(login({ user, token }));
        // navigate("/");
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
            onSubmit={loginSubmitHandler}>
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
                            onClick={registerPageNavigator}>
                            Register
                        </Button>
                    </div>
                    <div className={classes["login-action-button"]}>
                        <Button style="primary" type="submit">
                            Login
                        </Button>
                        <Button
                            style="secondary"
                            type="button"
                            onClick={homePageNavigator}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Card>
        </form>
    );
};

export default Login;
