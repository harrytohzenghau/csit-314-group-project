const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");

const AgentController = require("../controllers/agent.controller");

const { verifyAdmin, verifyUser } = require("../middlewares/tokenVerification");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });

const admin = new AgentController();

router
    .route("/")
    .get(catchAsync(admin.getProperties))
    .post(catchAsync(admin.postProperty))
    .patch(catchAsync(admin.updateProperty))
    .delete(catchAsync(admin.deleteProperty));

module.exports = router;
