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

router.route("/register").post(catchAsync(authController.userRegistration));
router.route("/login").post(catchAsync(authController.userLogin));
router
    .route("/createUser")
    .post(verifyAdmin, catchAsync(authController.createUser));

router
    .route("/createAgent")
    .post(verifyAdmin, catchAsync(authController.createAgent));

module.exports = router;
