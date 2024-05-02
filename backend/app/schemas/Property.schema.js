const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
    {
        property_location: {
            type: String,
            required: true,
            default: "123",
        },
        property_type: {
            type: String,
            enum: ["Condo", "Landed", "HDB"],
            required: true,
            default: "Condo",
        },
        property_new_project: {
            type: Boolean,
            required: true,
            default: false,
        },
        property_price: {
            type: Number,
            required: true,
            default: 0,
        },
        property_bedroom: {
            type: String,
            enum: ["1", "2", "3", "4", "5"],
            required: true,
            default: "5",
        },
        property_floor_size: {
            type: Number,
            required: true,
            default: 5,
        },
        property_PSF: {
            type: Number,
            required: true,
            default: 5,
        },
        property_bathroom: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
            default: 1,
        },
        property_tenure: {
            type: String,
            values: [
                "Freehold",
                "99-year LeaseHold",
                "103-year LeaseHold",
                "110-year LeaseHold",
                "999-year LeaseHold",
                "9999-year LeaseHold",
                "Unkown Tenure",
            ],
            required: true,
            default: "Freehold",
        },
        property_build_year: {
            type: Number,
            required: true,
            default: 2000,
        },
        property_floor_level: {
            type: String,
            values: ["Ground", "Low", "Mid", "High", "Penthouse"],
            required: true,
            default: "Ground",
        },
        property_furnishing: {
            type: String,
            values: ["Unfurnished", "Partially Furnished", "Fully Furnished"],
            required: true,
            default: "Unfurnished",
        },
        property_keyword: [
            {
                type: String,
            },
        ],
    },
    { _id: false }
);

const relevantSchema = new Schema(
    {
        // favourites: {
        //     type: Number,
        //     required: true,
        //     default: 0,
        // },
    },
    { _id: false }
);

const propertySchema = new Schema(
    {
        property_agentSchema: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Agent",
        },
        property_propertySchema: {
            type: listingSchema,
            required: true,
            default: {},
        },
        property_views: {
            type: Number,
            required: true,
            default: 0,
        },
        property_userLikes: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
        ],
        property_date: {
            type: Date,
            required: true,
            default: new Date(),
        },
        property_name: {
            type: String,
            required: true,
            default: "Testing",
        },
        property_images: [
            {
                type: String,
                required: true,
                default: "",
            },
        ],
        property_price: {
            type: Number,
            required: true,
            default: 123,
        },
    },
    { minimize: false }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
