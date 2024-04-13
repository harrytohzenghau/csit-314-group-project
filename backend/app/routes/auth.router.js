const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");
const authController = require("../api/auth/auth.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/verifyAdmin");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const auth = new authController();

router.route("/register").post(catchAsync(auth.userRegistration));
router.route("/login").post(catchAsync(auth.userLogin));

module.exports = router;
