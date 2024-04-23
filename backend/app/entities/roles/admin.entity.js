const AgentEntity = require("./agent.entity");

const User = require("../../schemas/User.schema");
const Agent = require("../../schemas/Agent.schema");

const bcrypt = require("bcrypt");

class AdminEntity extends AgentEntity {
    admin = {};
    allUsers = [];

    async fetchAllUsers() {
        this.allUsers = await User.find().select("-user_details.password");
    }

    get allUsers() {
        return this.allUsers;
    }
}

module.exports = AdminEntity;
