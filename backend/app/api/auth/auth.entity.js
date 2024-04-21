const User = require("../../models/User.model");
const Agent = require("../../models/Agent.model");
const UserClass = require("../../class/user.class");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthEntity {
    token;
    tokenSecret;

    async createUser(data) {
        const user = new UserClass();
        user.newUser(data);
        return user;
    }

    async createAgent(user) {
        const newUser = await this.createUser(user);
        const newAgent = new Agent({ agent_userSchema: newUser });
        await newAgent.save();
        return newAgent;
    }

    async createAdmin(user) {
        const newUser = await this.createUser(user);
        return newUser;
    }

    async authenticateUser(username, password) {
        const user = await User.findOne({
            "user_details.username": username,
        });
        if (!user) throw "User does not exist!";

        const passwordMatch = await bcrypt.compare(
            password,
            user.user_details.password
        );
        if (!passwordMatch) throw "Authentication Failed";
        return user;
    }

    async tokenSecretCondition(user) {
        if (user.user_admin) {
            this.tokenSecret = process.env.ADMIN_TOKEN_SECRET;
        } else if (user.user_agent) {
            this.tokenSecret = process.env.AGENT_TOKEN_SECRET;
        } else {
            this.tokenSecret = process.env.USER_TOKEN_SECRET;
        }
    }

    async setToken(user) {
        this.tokenSecretCondition(user);

        this.token = jwt.sign(
            { username: user.user_details.username },
            this.tokenSecret,
            {
                expiresIn: "365d",
            }
        );

        return;
    }

    async verifyToken(user, token) {
        this.tokenSecretCondition(user);
        return jwt.verify(token, this.tokenSecret);
    }

    get token() {
        return this.token;
    }
}

module.exports = AuthEntity;
