const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");

const AdminController = require("../controllers/admin.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const admin = new AdminController();

router
    .route("/")
    .get(verifyAdmin, catchAsync(admin.getUsers))
    .post(verifyAdmin, catchAsync(admin.postUser))
    .patch(verifyAdmin, catchAsync(admin.patchUser))
    .delete(verifyAdmin, catchAsync(admin.deleteUser));

module.exports = router;
