const User = require("../schemas/User.schema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthEntity {
    token;
    tokenSecret;

    async authenticateUser(pw, userPw) {
        const passwordMatch = await bcrypt.compare(pw, userPw);
        if (!passwordMatch) throw "Authentication Failed";
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
