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

const agent = new AgentController();

router
    .route("/:id")
    .get(catchAsync(agent.getAgentProperty))
    .post(catchAsync(agent.postProperty));

router
    .route("/:property_id")
    .patch(catchAsync(agent.patchProperty))
    .delete(catchAsync(agent.deleteProperty));

module.exports = router;
