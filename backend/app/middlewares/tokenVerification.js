const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        return res
            .status(401)
            .json({ error: "No Authorization value in header" });

    try {
        jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ error: error, message: "Invalid Token" });
    }
};

const verifyUser = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        return res
            .status(401)
            .json({ error: "No Authorization value in header" });

    try {
        const decoded = jwt.verify(token, process.env.USER_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
};

module.exports = { verifyAdmin, verifyUser };
