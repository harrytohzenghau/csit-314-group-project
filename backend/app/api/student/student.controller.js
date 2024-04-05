const Room = require("../../models/room.model");
const Booking = require("../../models/booking.model");
const Student = require("../../api/user/student.model");

module.exports = {
    findAvailRooms: async (req, res) => {
        const rooms = await Room.find({ "details.available": true });
        res.json(rooms);
    },
    bookARoom: async (req, res) => {
        const { room_id, user_id, date, start, end, promo, day, price } =
            req.body;
        const room = await Room.findById(room_id);
        const student = await Student.findById(user_id);

        const booking = new Booking({
            room,
            date,
            price: parseInt(price),
            start,
            end,
            booked_by: student,
            promo,
            day,
        });
        await booking.save();

        student.bookings = booking;
        await student.save();
        res.json(true);
    },
    allBookings: async (req, res) => {
        const { id } = req.body;

        const bookings = await Booking.find({ booked_by: id }).populate("room");
        res.json(bookings);
    },
    updateBooking: async (req, res) => {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        booking.start = req.body.start;
        booking.end = req.body.end;
        booking.date = req.body.date;
        booking.day = req.body.day;
        booking.price = req.body.price;
        await booking.save();
        res.json(true);
    },
    deleteBooking: async (req, res) => {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);
        res.json(true);
    },
};
