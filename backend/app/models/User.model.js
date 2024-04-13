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
        // nationality: {
        //     type: String,
        //     required: true,
        // },
        mobile_number: {
            type: Number,
            required: true,
        },
        email_address: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
        user_image: String,
    },
    { _id: false }
);

const rentingPreferencesSchema = new Schema(
    {
        renting_move_in_date: {
            type: String,
            required: true,
        },
        renting_lease_term: {
            type: String,
            required: true,
        },
        renting_number_occupants: {
            type: String,
            required: true,
        },
        renting_budget: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const userSchema = new Schema({
    user_sys_admin: {
        type: Boolean,
        required: true,
        default: false,
    },
    user_agent: {
        type: Boolean,
        required: true,
        default: false,
    },
    user_details: personalDetailsSchema,
    // user_renting_preference: rentingPreferencesSchema,
    user_budget: Number,
    user_created: {
        type: Date,
        required: true,
        default: new Date(),
    },
    // shortlist
});

const User = mongoose.model("User", userSchema);
module.exports = User;
