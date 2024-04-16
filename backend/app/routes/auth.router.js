const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");
const authController = require("../api/auth/auth.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const auth = new authController();

router.route("/register/user").post(catchAsync(auth.userRegistration));
router
    .route("/register/agent")
    .post(verifyAdmin, catchAsync(auth.agentRegistration));

router
    .route("/register/admin")
    .post(verifyAdmin, catchAsync(auth.adminRegistration));

router.route("/login").post(catchAsync(auth.userLogin));
router.route("/logout").post(catchAsync(auth.userLogout));

module.exports = router;
