const User = require("../../models/User.model");
const Agent = require("../../models/Agent.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const newUser = async (req) => {
    const { user_details, user_sys_admin, user_agent } = req.body;
    const hashedPassword = await bcrypt.hash(user_details.password, 10);
    user_details.password = hashedPassword;

    return new User({ user_details, user_sys_admin, user_agent });
};

const newAgent = async (req) => {
    const user = await newUser(req);
    const agent = new Agent({ agent_userSchema: user });

    return { user, agent };
};

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
    userLogin: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Authentication Failed!" });
            }
            const passwordMatch = await bcrypt.compare(
                password,
                user.user_details.password
            );
            if (!passwordMatch) {
                return res.status(401).json({ error: "Authentication Failed" });
            }

            if (user.user_sys_admin) {
                const token = jwt.sign(
                    { username },
                    process.env.ADMIN_TOKEN_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );

                return res.status(200).json({ token });
            } else {
                const token = jwt.sign(
                    { username },
                    process.env.USER_TOKEN_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );

                res.status(200).json({ token });
            }
        } catch (error) {
            res.status(500).json({ error: "Login Failed" });
        }
    },
    createUser: async (req, res) => {
        try {
            const user = newUser(req);
            await user.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ error: "User registration failed" });
        }
    },
    createAgent: async (req, res) => {
        try {
            const { user, agent } = await newAgent(req);
            await user.save();
            await agent.save();

            res.status(201).json({ message: "Agent registered successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Agent registration failed" });
        }
    },
};
