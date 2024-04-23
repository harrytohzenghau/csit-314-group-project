const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");

const ProfileController = require("../controllers/profile.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const profile = new ProfileController();

router
    .route("/")
    .get(catchAsync(profile.getProfile))
    .patch(catchAsync(profile.patchProfile));

module.exports = router;
