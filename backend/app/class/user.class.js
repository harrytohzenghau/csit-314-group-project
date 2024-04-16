const User = require("../models/User.model");

class UserClass {
    user_details = {};
    user_admin;
    user_agent;

    user = {};

    set user(user) {
        this.user = user;
        return;
    }
    get user() {
        return this.user;
    }

    set userDetails(user_details) {
        this.user_details = user_details;
        return;
    }
    get userDetails() {
        return this.user_details;
    }

    set userAdmin(admin) {
        this.user_admin = admin;
    }

    get userAdmin() {
        return this.user_admin;
    }

    set userAgent(agent) {
        this.user_agent = agent;
    }

    get userAgent() {
        return this.user_agent;
    }

    async getUserById(id) {
        this.user = await User.findById(id);
        if (!this.user) throw "User not found";
        return;
    }
}

module.exports = UserClass;
