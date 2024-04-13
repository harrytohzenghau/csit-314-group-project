const User = require("../../models/User.model");
const Agent = require("../../models/Agent.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class ProfileEntity {
    constructor(body) {
        this.user_details = body.user_details;
        this.user_sys_admin = body.user_sys_admin;
        this.user_agent = body.user_agent;
    }
    #user;

    async getUser(req) {
        this.user = await User.findById(req.body._id);
    }
}

module.exports = ProfileEntity;
