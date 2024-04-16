const User = require("../../models/User.model");
const Agent = require("../../models/Agent.model");
const Listing = require("../../models/Listing.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class PropertyEntity {
    async getAllProperties() {
        return await Listing.find();
    }

    async createProperty(data) {
        const listing = new Listing(data);
        await listing.save();
        return;
    }

    async findByIdAndUpdate(data) {
        const { _id } = data;
        await Listing.findByIdAndUpdate(_id, data);
    }

    async findByIdAndDelete(data) {
        const { _id } = data;
        await Listing.findByIdAndDelete(_id);
    }
}

module.exports = PropertyEntity;
