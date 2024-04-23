const AgentEntity = require("./agent.entity");

const User = require("../../schemas/User.schema");

const bcrypt = require("bcrypt");

class AdminEntity extends AgentEntity {
    admin = {};
    allUsers = [];

    async fetchAllUsers() {
        this.allUsers = await User.find().select("-user_details.password");
    }

    async createUser(data) {
        const user = this.createUser(data);
        return user;
    }

    async createAgent(data) {
        const agent = this.createAgent(data);
        return agent;
    }

    async createAdmin(data) {
        this.admin = this.newUser(data);
        return this.admin;
    }

    async updateUser(data) {
        const { _id } = data;
        const { password } = data.user_details;

        if (password)
            data.user_details.password = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(_id, data);
    }

    async removeUser(data) {
        const { _id } = data;
        await User.findByIdAndDelete(_id);
    }

    get allUsers() {
        return this.allUsers;
    }
}

module.exports = AdminEntity;
