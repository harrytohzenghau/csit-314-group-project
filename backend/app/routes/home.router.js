const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");
const homeController = require("../api/home/home.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const home = new homeController();

router.route("/").get(catchAsync(home.findHomes));

module.exports = router;
