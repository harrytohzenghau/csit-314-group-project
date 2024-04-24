const UserEntity = require("./user.entity");
const Agent = require("../../schemas/Agent.schema");
const User = require("../../schemas/User.schema");

class AgentEntity extends UserEntity {
    agent = {};

    get agentProperty() {
        return this.agent.agent_properties;
    }

    async createAgent(data) {
        const user = await this.createUser(data);
        this.agent = new Agent({ agent_userSchema: user._id });
        await this.agent.save();
        return;
    }

    async fetchAgentByUserId(id) {
        this.agent = await Agent.findOne({ agent_userSchema: id }).populate(
            "agent_properties"
        );
        return;
    }

    async addToAgentProperty(property) {
        this.agent.agent_properties.push(property.propertyId);
        this.agent.save();
        return;
    }

    async removeAgentById(id) {
        await Agent.findOneAndDelete({ agent_userSchema: id });
        await User.findByIdAndDelete(id);
        return;
    }
}

module.exports = AgentEntity;
