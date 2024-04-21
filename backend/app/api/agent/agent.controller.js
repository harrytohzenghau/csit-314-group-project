const AgentEntity = require("./agent.entity");
const AgentClass = require("../../class/agent.class");

class AgentController {
    async POST(req, res) {
        try {
            const agent = new AgentEntity();
            await agent.newListing();

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
