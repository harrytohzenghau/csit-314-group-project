const AdminEntity = require("./admin.entity");
const AdminClass = require("../../class/admin.class");

class AdminController {
    async viewAllUsers(req, res) {
        try {
            const admin = new AdminEntity();
            const allUsers = await admin.getAllUsers();

            res.status(201).json({
                success: true,
                message: "All users fetched",
                allUsers,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch users",
            });
        }
    }
    async updateUser(req, res) {
        try {
            const admin = new AdminEntity();
            await admin.findByIdAndUpdate(req.body);

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
    async banUser(req, res) {
        try {
            const admin = new AdminEntity();
            await admin.findByIdAndBan(req.body);

            res.status(201).json({
                success: true,
                message: "User banned",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to ban user",
            });
        }
    }
    async deleteUser(req, res) {
        try {
            const admin = new AdminEntity();
            await admin.findByIdAndDelete(req.body);

            res.status(201).json({
                success: true,
                message: "User deleted",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to delete user",
            });
        }
    }
}

module.exports = AdminController;
