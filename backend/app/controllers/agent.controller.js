const AgentEntity = require("../entities/roles/agent.entity");
const PropertyEntity = require("../entities/property.entity");

class AgentController {
    async getProperties(req, res) {
        try {
            const property = new PropertyEntity();
            await property.getAllListings();

            res.status(201).json({
                success: true,
                message: "All users fetched",
                allProperties: property.allListings,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch users",
            });
        }
    }

    async postProperty(req, res) {
        try {
            const id = req.headers.cookie;

            const property = new PropertyEntity();
            property.createListing(id, req.body);

            res.status(201).json({
                success: true,
                message: "New property",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to create property",
            });
        }
    }

    async updateProperty(req, res) {
        try {
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

    async deleteProperty(req, res) {
        try {
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
}

module.exports = AgentController;
