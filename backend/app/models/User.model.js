const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalDetailsSchema = new Schema(
    {
        personal_first_name: {
            type: String,
            required: true,
        },
        personal_last_name: {
            type: String,
            required: true,
        },
        personal_nationality: {
            type: String,
            required: true,
        },
        personal_mobile_number: {
            type: Number,
            required: true,
        },
        personal_email_address: {
            type: String,
            required: true,
        },
        personal_active: {
            type: Boolean,
            required: true,
        },
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
    user_system_administrator: {
        type: Boolean,
        required: true,
        default: false,
    },
    user_details: personalDetailsSchema,
    user_renting_preference: rentingPreferencesSchema,
    user_image: String,
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
