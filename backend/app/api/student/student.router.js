const express = require("express");
const router = express.Router();
const catchAsync = require("../../errors/catchAsync");

const studentController = require("./student.controller");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });
router
    .route("/")
    .get(catchAsync(studentController.findAvailRooms))
    .post(catchAsync(studentController.bookARoom));

router
    .route("/bookings")
    .post(catchAsync(studentController.allBookings))
    .put(catchAsync(studentController.updateBooking));

router.route("/bookings/:id").post(catchAsync(studentController.deleteBooking));

module.exports = router;
