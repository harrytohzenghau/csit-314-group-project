const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");
const authController = require("../api/auth/auth.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/verifyAdmin");

const jwt = require("jsonwebtoken");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

router.route("/").post(catchAsync(authController.userRegistration));

module.exports = router;
