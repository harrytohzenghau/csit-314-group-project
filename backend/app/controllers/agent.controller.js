const AgentEntity = require("../entities/roles/agent.entity");
const PropertyEntity = require("../entities/property.entity");

class AgentController {
    async getAllAgents(req, res) {
        try {
            const agent = new AgentEntity();
            await agent.fetchAllAgents();

            res.status(201).json({
                success: true,
                message: "All Agents fetched",
                allAgents: agent.allAgents,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch agents",
            });
        }
    }

    async getAgentProperty(req, res) {
        try {
            const { id } = req.params;
            const agent = new AgentEntity();
            await agent.fetchAgentByUserId(id);

            res.status(201).json({
                success: true,
                message: "Agent fetched",
                allProperty: agent.agentProperty,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch agent",
            });
        }
    }

    async postProperty(req, res) {
        try {
            const { id } = req.params;
            const agent = new AgentEntity();
            await agent.fetchAgentByUserId(id);

            const property = new PropertyEntity();
            await property.createProperty(agent.agent._id, req.body);

            await agent.addToAgentProperty(property);

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

    async patchProperty(req, res) {
        try {
            const { property_id } = req.params;

            const property = new PropertyEntity();
            property.updateProperty(property_id, req.body);

            res.status(201).json({
                success: true,
                message: "Property updated",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to update property",
            });
        }
    }

    async deleteProperty(req, res) {
        const { property_id } = req.params;
        const property = new PropertyEntity();
        property.deleteProperty(property_id);

        try {
            res.status(201).json({
                success: true,
                message: "Property Deleted",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to delete property",
            });
        }
    }
}

module.exports = AgentController;
