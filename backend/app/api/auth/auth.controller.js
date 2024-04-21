const AuthEntity = require("./auth.entity");
const UserClass = require("../../class/user.class");

function intialiseUserClass(req) {
    const { user_details, user_agent, user_admin } = req.body;

    const user = new UserClass();
    user.userDetails = user_details;
    user.userAdmin = user_admin;
    user.userAgent = user_agent;
    return user;
}

class AuthController {
    async userRegistration(req, res) {
        try {
            const auth = new AuthEntity();
            await auth.createUser(req.body);
            res.status(201).json({ message: "User registration succeeded" });
        } catch (error) {
            res.status(500).json({
                error,
                message: "User registration failed",
            });
        }
    }

    async agentRegistration(req, res) {
        try {
            const user = intialiseUserClass(req);
            const auth = new AuthEntity();
            await auth.createAgent(user);
            res.status(201).json({ message: "User registration succeeded" });
        } catch (error) {
            res.status(500).json({ error: "User registration failed" });
        }
    }

    async adminRegistration(req, res) {
        try {
            const user = intialiseUserClass(req);
            const auth = new AuthEntity();
            await auth.createAdmin(user);
            res.status(201).json({ message: "User registration succeeded" });
        } catch (error) {
            res.status(500).json({ error: "User registration failed" });
        }
    }

    async userLogin(req, res) {
        try {
            const { username, password } = req.body;

            const auth = new AuthEntity();
            const user = new UserClass();
            user.user = await auth.authenticateUser(username, password);
            await auth.setToken(user.user);

            res.status(200).json({
                success: true,
                message: "Login Successful",
                user: user.user,
                token: auth.token,
            });
        } catch (error) {
            res.status(500).json({ error, message: "Login Failed" });
        }
    }

    async userLogout(req, res) {
        try {
            const { username, id } = req.body;
            const user = new UserClass();
            await user.getUserById(id);

            const auth = new AuthEntity();
            const decoded = await auth.verifyToken(
                user.user,
                req.headers.authorization
            );

            if ((decoded.username = username))
                res.status(200).json({
                    success: true,
                    message: "Logout Successful",
                });
        } catch (error) {
            res.status(500).json({ error, message: "Logout Failed" });
        }
    }
}

module.exports = AuthController;
