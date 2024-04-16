const User = require("../models/User.model");
const UserClass = require("./user.class");

class AdminClass extends UserClass {
    agent = {};
}

module.exports = AdminClass;
