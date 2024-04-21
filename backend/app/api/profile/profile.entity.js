const User = require("../../models/User.model");
const Agent = require("../../models/Agent.model");
const Listing = require("../../models/Listing.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class ProfileEntity {
    async getUser(id) {
        return await User.findById(id).select("-user_details.password");
    }

    async updateUser(data, _id) {
        const { password } = data.user_details;
        data.user_details.password = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(_id, data);
        return;
    }
}

module.exports = ProfileEntity;
