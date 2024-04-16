const User = require("../models/User.model");
const UserClass = require("../class/user.class");

class AgentClass extends UserClass {
    agent = {};
}

module.exports = AgentClass;
