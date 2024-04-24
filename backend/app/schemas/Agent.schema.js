const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agentSchema = new Schema(
    {
        agent_userSchema: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        agent_rating: {
            type: Number,
            required: true,
            default: 5,
        },
        agent_reviews: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Review",
            },
        ],
        agent_properties: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Property",
            },
        ],
    },
    { minimize: false }
);

const Agent = mongoose.model("Agent", agentSchema);
module.exports = Agent;
