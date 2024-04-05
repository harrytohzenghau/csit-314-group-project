const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    staff_details: {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        contact_number: {
            type: Number,
            required: true,
        },
        email_address: {
            type: String,
            required: true,
        },
    },
    promo_codes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Promo code",
        },
    ],
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
