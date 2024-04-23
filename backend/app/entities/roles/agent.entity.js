const UserEntity = require("./user.entity");
const Agent = require("../../schemas/Agent.schema");
const User = require("../../schemas/User.schema");

class AgentEntity extends UserEntity {
    agent = {};

    async createAgent(data) {
        const user = await this.createUser(data);
        this.agent = new Agent({ agent_userSchema: user._id });
        await this.agent.save();
        return;
    }

    async removeAgentById(id) {
        await Agent.findOneAndDelete({ agent_userSchema: id });
        await User.findByIdAndDelete(id);
        return;
    }
}

module.exports = AgentEntity;
