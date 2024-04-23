const UserEntity = require("./user.entity");
const Agent = require("../../schemas/Agent.schema");

class AgentEntity extends UserEntity {
    agent = {};

    async createAgent(data) {
        const user = this.createUser(data);
        this.agent = new Agent({ agent_userSchema: user });
        await this.agent.save();
        return this.agent;
    }
}

module.exports = AgentEntity;
