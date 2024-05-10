const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const config = require("./config");

require("dotenv").config();
const PRODUCTION = process.env.NODE_ENV === "production";

main().catch((err) => console.log(err));
async function main() {
    if (PRODUCTION) {
        const uri = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.port}`;
        await mongoose.connect(uri);
        console.log(`Mongo connected to Atlas`);
        return;
    }
    const uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/RedDotSeed`;
    await mongoose.connect(uri);
    console.log(`Mongo connected to ${uri}`);
}

const User = require("../app/schemas/User.schema");
const Agent = require("../app/schemas/Agent.schema");
const Property = require("../app/schemas/Property.schema");
// const Review = require("../app/schemas/Review.schema");

const properties = require("./db/properties");
const users = require("./db/users");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", async (req, res) => {
    for (const user of users) {
        const { user_details, user_agent, user_admin, user_finance } = user;
        const { password } = user_details;
        user_details.password = await bcrypt.hash(password, 10);

        const newUser = new User({
            user_details,
            user_agent,
            user_admin,
            user_finance,
        });

        if (user_agent) {
            const newAgent = new Agent({ agent_userSchema: newUser._id });
            await newAgent.save();
        }

        await newUser.save();
    }
    res.send("Saved!");
});

app.get("/properties", async (req, res) => {
    for (const prop of properties) {
        const numOfAgents = await Agent.find().count();
        const rand = Math.floor(Math.random() * numOfAgents);
        const agent = await Agent.findOne({ step: rand });

        const newProp = new Property(prop);
        newProp.property_agentSchema = agent;
        agent.agent_properties.push(newProp);

        await agent.save();
        await newProp.save();
    }
    res.send("Saved!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
