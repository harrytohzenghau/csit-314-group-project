const express = require("express");
const router = express.Router();

const site = require("./controller");

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log("Time: ", Date.now());
//     next();
// });
router.route("/", site.home);

module.exports = router;
