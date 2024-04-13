const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");
const profileController = require("../api/profile/profile.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/verifyAdmin");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const profile = new profileController();

router.route("/").get(catchAsync(profile.viewProfile));

module.exports = router;
