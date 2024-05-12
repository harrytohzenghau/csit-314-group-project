const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");
const BuyController = require("../controllers/buy.controller");

const buy = new BuyController();

router.route("/").get(catchAsync(buy.getAllProperties));

router.route("/:id").get(catchAsync(buy.getProperty));

router.route("/favourite").post(catchAsync(buy.postFavourite));
router.route("/like").post(catchAsync(buy.postLike));
router.route("/add/:id").post(catchAsync(buy.addOneView));

module.exports = router;
