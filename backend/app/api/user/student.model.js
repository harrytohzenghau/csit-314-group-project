const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_details: {
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
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    receipts: [{ type: Schema.Types.ObjectId, ref: "Receipt" }],
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
