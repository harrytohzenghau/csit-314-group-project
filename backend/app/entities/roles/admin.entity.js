const AgentEntity = require("./agent.entity");

const User = require("../../schemas/User.schema");
const Agent = require("../../schemas/Agent.schema");

class AdminEntity extends AgentEntity {
    admin = {};
    allUsers = [];

    async fetchAllUsers() {
        this.allUsers = await User.find().select("-user_details.password");
    }

    get allUsers() {
        return this.allUsers;
    }

    async updateUser(data) {
        const { username } = data.user_details;
        this.updateUserByUsername(data);
        const user = await User.findOne({ "user_details.username": username });
        user.user_admin = data.user_admin;
        user.user_agent = data.user_agent;
        user.user_active = data.user_active;
        user.save();
    }
}

module.exports = AdminEntity;
