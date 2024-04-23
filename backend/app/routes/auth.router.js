const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");

const AuthController = require("../controllers/auth.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const auth = new AuthController();

router.route("/register").post(catchAsync(auth.postUser));
router.route("/login").post(catchAsync(auth.postLogin));
router.route("/logout").post(catchAsync(auth.postLogout));

module.exports = router;
