const AdminEntity = require("../entities/roles/admin.entity");

class AdminController {
    async getUsers(req, res) {
        try {
            const admin = new AdminEntity();
            await admin.fetchAllUsers();

            res.status(201).json({
                success: true,
                message: "All users fetched",
                allUsers: admin.allUsers,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch users",
            });
        }
    }
    async postUser(req, res) {
        try {
            const admin = new AdminEntity();
            await admin.createUser(req.body);

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
    async patchUser(req, res) {
        try {
            const admin = new AdminEntity();
            await admin.updateUser(req.body);

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
    async postAgent(req, res) {
        try {
            const admin = new AdminEntity();
            await admin.createAgent(req.body);

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
    async postAdmin(req, res) {
        try {
            const admin = new AdminEntity();
            await admin.createAdmin(req.body);

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
            await admin.removeUser(req.body);

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
