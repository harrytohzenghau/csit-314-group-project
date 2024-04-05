const config = module.exports;
require("dotenv").config();

const PRODUCTION = process.env.NODE_ENV === "production";

if (PRODUCTION) {
    config.express = {
        port: process.env.PORT,
        ip: process.env.IP,
    };

    config.mongodb = {
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASSWORD,
        port: process.env.MONGODB_PORT,
    };
} else {
    config.express = {
        port: 3000,
        ip: "127.0.0.1",
    };

    config.mongodb = {
        port: 27017,
        host: "localhost",
    };
}
