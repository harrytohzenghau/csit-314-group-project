const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalDetailsSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile_number: {
            type: Number,
            required: true,
        },
        email_address: {
            type: String,
            required: true,
        },
        user_image: String,
    },
    { _id: false }
);

const userSchema = new Schema(
    {
        user_admin: {
            type: Boolean,
            required: true,
            default: false,
        },
        user_agent: {
            type: Boolean,
            required: true,
            default: false,
        },
        user_active: {
            type: Boolean,
            required: true,
            default: true,
        },
        user_favourites: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Property",
            },
        ],
        user_likes: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Property",
            },
        ],
        user_details: personalDetailsSchema,
        user_budget: Number,
        user_created: {
            type: Date,
            required: true,
            default: new Date(),
        },
        // shortlist
    },
    { minimize: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
