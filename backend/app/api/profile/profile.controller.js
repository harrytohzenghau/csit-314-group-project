const ProfileEntity = require("./profile.entity");

class ProfileController {
    async viewProfile(req, res) {
        try {
            const profile = new ProfileEntity();
            profile.getUser(req);

            res.status(201).json({ user: profile.user });
        } catch (error) {
            res.status(500).json({ error: "Login Failed" });
        }
    }
}

module.exports = ProfileController;
