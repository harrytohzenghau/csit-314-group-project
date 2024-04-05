const express = require("express");
const router = express.Router();
const catchAsync = require("../../errors/catchAsync");

const user = require("./user.controller");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });
router.route("/:status").post(catchAsync(user.login));

module.exports = router;
