const UserEntity = require("../entities/roles/user.entity");

class ProfileController {
    async getProfile(req, res) {
        try {
            const profile = new UserEntity();
            const { id } = req.params;
            await profile.fetchUserById(id);

            res.status(201).json({
                success: true,
                message: "Profile fetched",
                profile: profile.user,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch profile",
            });
        }
    }

    async patchProfile(req, res) {
        try {
            const profile = new UserEntity();
            await profile.updateUserByUsername(req.body);

            res.status(201).json({
                success: true,
                message: "User updated",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: "Failed to update user",
            });
        }
    }
}

module.exports = ProfileController;
