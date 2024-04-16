const User = require("../../models/User.model");
const Agent = require("../../models/Agent.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AdminEntity {
    async getAllUsers() {
        const allUsers = await User.find({ user_active: true }).select(
            "-user_details.password"
        );
        return allUsers;
    }

    async findByIdAndUpdate(data) {
        const { _id } = data;
        const { password } = data.user_details;

        data.user_details.password = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(_id, data);
    }
    async findByIdAndBan(data) {
        const { _id } = data;
        await User.findByIdAndUpdate(_id, {
            user_active: false,
        });
    }
    async findByIdAndDelete(data) {
        const { _id } = data;
        await User.findByIdAndDelete(_id);
    }
}

module.exports = AdminEntity;
