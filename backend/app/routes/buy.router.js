const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");
const BuyController = require("../controllers/buy.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const buy = new BuyController();

router.route("/").get(catchAsync(buy.getAllProperties));

router.route("/:id").get(catchAsync(buy.getProperty));

router.route("/favourite").post(catchAsync(buy.postFavourite));
router.route("/like").post(catchAsync(buy.postLike));
router.route("/add/:id").get(catchAsync(buy.addOneView));

module.exports = router;
