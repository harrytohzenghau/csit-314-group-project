const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    // room_schema: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Room",
    // },
    property_type: {
        type: Enum,
        values: ["Condo", "Landed", "HDB"],
        required: true,
    },
    property_new_project: {
        type: Boolean,
        required: true,
    },
    // property_affordable: {
    //     type: String,
    //     required: true,
    // },
    property_price: {
        type: Number,
        required: true,
    },
    property_bedroom: {
        type: Enum,
    },
    property_floor_size: {
        type: Number,
    },
    property_PSF: {
        type: Number,
    },
    property_bathroom: {
        type: Number,
        required: true,
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
    },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
