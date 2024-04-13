const app = require("./index");
const config = require("./config");
const mongoose = require("mongoose");

require("dotenv").config();
const PRODUCTION = process.env.NODE_ENV === "production";

// MONGODB
main().catch((err) => console.log(err));
async function main() {
    if (PRODUCTION) {
        const uri = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.port}`;
        await mongoose.connect(uri);
        console.log(`Mongo connected to Atlas`);
        return;
    }
    const uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/RedDot`;
    await mongoose.connect(uri);
    console.log(`Mongo connected to ${uri}`);
}

// EXPRESS SERVER

app.listen(config.express.port, config.express.ip, function (error) {
    if (error) {
        console.error("Unable to listen for connections", error);
        process.exit(10);
    }
    console.log(
        "express is listening on http://" +
            config.express.ip +
            ":" +
            config.express.port
    );
});
