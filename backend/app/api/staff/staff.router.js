const express = require("express");
const router = express.Router();
const catchAsync = require("../../errors/catchAsync");

const staffController = require("./staff.controller");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });
router
    .route("/")
    .get(catchAsync(staffController.allRooms))
    .put(catchAsync(staffController.updateRoom))
    .delete(catchAsync(staffController.deleteRoom));

router.route("/room/create").post(catchAsync(staffController.create));
router
    .route("/room/launch")
    .get(catchAsync(staffController.allRooms))
    .post(catchAsync(staffController.makeRoomAvail));

module.exports = router;
