const AuthEntity = require("../entities/auth.entity");
const UserEntity = require("../entities/roles/user.entity");

class AuthController {
    async postUser(req, res) {
        try {
            const user = new UserEntity();
            await user.createUser(req.body);

            res.status(201).json({ message: "User registration succeeded" });
        } catch (error) {
            res.status(500).json({
                error,
                message: "User registration failed",
            });
        }
    }

    async postLogin(req, res) {
        try {
            const { username, password } = req.body;

            const auth = new AuthEntity();
            const user = new UserEntity();
            await user.fetchUserByUsername(username);

            await auth.authenticateUser(password, user.password);
            await auth.setToken(user.user);

            res.status(200).json({
                success: true,
                message: "Login Successful",
                id: user.id,
                username: user.username,
                token: auth.token,
            });
        } catch (error) {
            res.status(500).json({ error, message: "Login Failed" });
        }
    }

    async postLogout(req, res) {
        try {
            const { username, id } = req.body;
            const user = new UserEntity();
            await user.fetchUserById(id);

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
