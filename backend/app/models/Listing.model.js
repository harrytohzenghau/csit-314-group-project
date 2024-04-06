const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
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
        },
        property_price: {
            type: Number,
            required: true,
            default: 0,
        },
        property_bedroom: {
            type: String,
            enum: ["Studio", "1", "2", "3", "4", "5"],
            required: true,
            default: "Studio",
        },
        property_floor_size: {
            type: Number,
            required: true,
            default: "5",
        },
        property_PSF: {
            type: Number,
            required: true,
            default: "5",
        },
        property_bathroom: {
            type: Number,
            enum: ["1", "2", "3", "4", "5"],
            required: true,
            default: "1",
        },
        property_tenure: {
            type: Enum,
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
            type: Enum,
            values: ["Ground", "Low", "Mid", "High", "Penthouse"],
            required: true,
            default: "Ground",
        },
        property_furnishing: {
            type: Enum,
            values: ["Unfurnished", "Partially Furnished", "Fully Furnished"],
            required: true,
            default: "Unfurnished",
        },
        property_keyword: [
            {
                type: String,
            },
        ],
        property_listing_live_tour: {
            type: Boolean,
            required: true,
            default: False,
        },
        property_listing_virtual_tour: {
            type: Boolean,
            required: true,
            default: False,
        },
    },
    { _id: False }
);

const listingSchema = new Schema({
    listing_propertySchema: propertySchema,
    listing_date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    listing_views: {
        type: Number,
        required: true,
        default: 0,
    },
    listing_shortlists: {
        type: Number,
        required: true,
        default: 0,
    },
    // listing_questions: [
    //     {
    //         type: String,
    //         required: true,
    //         default: 0,
    //     },
    // ],
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
