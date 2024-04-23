const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");

const SavedController = require("../controllers/saved.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const profile = new SavedController();

router.route("/").get(catchAsync(profile.viewProfile));

module.exports = router;
