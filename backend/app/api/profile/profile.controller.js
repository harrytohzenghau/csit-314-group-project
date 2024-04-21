const ProfileEntity = require("./profile.entity");

class ProfileController {
    async viewProfile(req, res) {
        try {
            const profile = new ProfileEntity();
            const id = req.headers.cookie;
            const user = await profile.getUser(id);

            res.status(201).json({
                success: true,
                message: "Profile fetched",
                user,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch profile",
            });
        }
    }

    async updateProfile(req, res) {
        try {
            const profile = new ProfileEntity();
            const id = req.headers.cookie;
            await profile.updateUser(req.body, id);

            res.status(201).json({
                success: true,
                message: "User updated",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to update user",
            });
        }
    }
}

module.exports = ProfileController;
