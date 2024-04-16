const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");
const propertyController = require("../api/property/property.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const property = new propertyController();

router
    .route("/")
    .get(catchAsync(property.viewAllProperties))
    .post(catchAsync(property.newProperty))
    .patch(catchAsync(property.updateProperty))
    .delete(catchAsync(property.deleteProperty));

module.exports = router;
