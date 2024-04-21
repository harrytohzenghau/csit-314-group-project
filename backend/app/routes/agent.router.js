const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");
const adminController = require("../api/admin/admin.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const admin = new adminController();

router
    .route("/")
    .get(verifyAdmin, catchAsync(admin.viewAllUsers))
    .patch(verifyAdmin, catchAsync(admin.updateUser))
    .post(verifyAdmin, catchAsync(admin.banUser))
    .delete(verifyAdmin, catchAsync(admin.deleteUser));

module.exports = router;
