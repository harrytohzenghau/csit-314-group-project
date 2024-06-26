const express = require("express");
const router = express.Router();
const catchAsync = require("../errors/catchAsync");

const AgentController = require("../controllers/agent.controller");

const fileUpload = require("../middlewares/fileUpload");

const agent = new AgentController();

router.route("/").get(catchAsync(agent.getAllAgents));

router
    .route("/:id")
    .get(catchAsync(agent.getAgentProperty))
    .post(
        fileUpload.array("property_images", 4),
        catchAsync(agent.postProperty)
    );

router
    .route("/:property_id")
    .patch(
        fileUpload.array("property_images", 4),
        catchAsync(agent.patchProperty)
    )
    .delete(catchAsync(agent.deleteProperty));

router.route("/review/:user_id").post(catchAsync(agent.postAgentReview));

module.exports = router;
