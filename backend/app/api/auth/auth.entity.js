const User = require("../../models/User.model");
const Agent = require("../../models/Agent.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthEntity {
    constructor(body) {
        this.user_details = body.user_details;
        this.user_sys_admin = body.user_sys_admin;
        this.user_agent = body.user_agent;
    }

    #user;
    #agent;
    #token;

    async saveAsUser() {
        this.user_details.password = await this.hashPassword();

        this.user = new User({
            user_details: this.user_details,
            user_sys_admin: this.user_sys_admin,
            user_agent: this.user_agent,
        });
        await this.user.save();
        return this.user;
    }

    async saveAsAgent() {
        await this.saveAsUser();
        this.agent = new Agent({ agent_userSchema: this.user });
        await this.agent.save();
        return this.agent;
    }

    async findUser(req, res) {
        const { username, password } = req.body;

        this.user = await User.findOne({
            "user_details.username": username,
        });
        if (!this.user) {
            return res.status(401).json({ error: "User does not exist!" });
        }

        const passwordMatch = await this.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Authentication Failed" });
        }

        return this.user;
    }

    async setToken(secret) {
        this.token = jwt.sign(
            { username: this.user.user_details.username },
            secret,
            {
                expiresIn: "1h",
            }
        );

        return;
    }

    async hashPassword() {
        return await bcrypt.hash(this.user_details.password, 10);
    }
    async comparePassword(password) {
        return await bcrypt.compare(password, this.user.user_details.password);
    }
}

module.exports = AuthEntity;
