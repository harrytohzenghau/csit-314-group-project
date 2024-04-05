const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailsSchema = new Schema(
    {
        name: String,
        size: Number,
        capacity: Number,
        available: Boolean,
    },
    { _id: false }
);

const locationSchema = new Schema(
    {
        type: String,
        floor: Number,
        unit: String,
    },
    { _id: false }
);

const schedulesSchema = new Schema(
    {
        days: [
            {
                type: String,
            },
        ],
        timeSlots: [
            {
                start: String,
                end: String,
                price: String,
                promo: String,
            },
        ],
    },
    { _id: false }
);

const roomSchema = new Schema({
    details: detailsSchema,
    location: locationSchema,
    schedules: [schedulesSchema],
    bookings: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
