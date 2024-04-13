const User = require("../../models/User.model");
const Agent = require("../../models/Agent.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    userRegistration: async (req, res) => {
        try {
            const user = newUser(req);
            await user.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ error: "User registration failed" });
        }
    },
};
