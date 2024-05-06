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

const financeSchema = new Schema(
    {
        downpayment: {
            type: Number,
            required: true,
            default: 40000,
        },
        interest_rate: {
            type: Number,
            required: true,
            default: 5,
        },
        loan_period: {
            type: Number,
            required: true,
            default: 20,
        },
        property_price: {
            type: Number,
            required: true,
            default: 400000,
        },
        loan_amt: {
            type: Number,
            required: true,
            default: 360000,
        },
        monthly: {
            type: Number,
            required: true,
            default: 69,
        },
    },
    { _id: false, minimize: false }
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
        user_finance: financeSchema,
        user_budget: Number,
        user_created: {
            type: Date,
            required: true,
            default: new Date(),
        },
    },
    { minimize: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
