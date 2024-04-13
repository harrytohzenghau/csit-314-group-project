const AuthEntity = require("./auth.entity");

class AuthController {
    async userRegistration(req, res) {
        try {
            const user = new AuthEntity(req.body);
            const { user_agent } = req.body;

            if (user_agent) {
                await user.saveAsAgent();
            } else {
                await user.saveAsUser();
            }

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ error: "User registration failed" });
        }
    }

    async userLogin(req, res) {
        try {
            const user = new AuthEntity(req.body);
            await user.findUser(req, res);

            if (user.user_sys_admin) {
                user.setToken(process.env.ADMIN_TOKEN_SECRET);
            } else {
                user.setToken(process.env.USER_TOKEN_SECRET);
            }

            res.status(200).json({ token: user.token, user: user.user });
        } catch (error) {
            res.status(500).json({ error: "Login Failed" });
        }
    }
}

module.exports = AuthController;
