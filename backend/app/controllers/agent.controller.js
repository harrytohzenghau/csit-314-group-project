const AgentEntity = require("../entities/roles/agent.entity");
const UserEntity = require("../entities/roles/user.entity");
const PropertyEntity = require("../entities/property.entity");
const fs = require("fs");

class AgentController {
    async getAllAgents(req, res) {
        try {
            const agent = new AgentEntity();
            await agent.fetchAllAgents();

            res.status(201).json({
                success: true,
                message: "All Agents fetched",
                allAgents: agent.allAgents,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch agents",
            });
        }
    }

    async getAgentProperty(req, res) {
        try {
            const { id } = req.params;
            const agent = new AgentEntity();
            await agent.fetchAgentByUserId(id);

            const user = new UserEntity();
            const allUsers = await user.fetchAllUsersOnly();

            res.status(201).json({
                success: true,
                message: "Agent fetched",
                allProperty: agent.agentProperty,
                allUsers,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch agent",
            });
        }
    }

    async postProperty(req, res) {
        try {
            const {
                seller_id,
                property_location,
                property_type,
                property_new_project,
                property_price,
                property_bedroom,
                property_floor_size,
                property_PSF,
                property_bathroom,
                property_tenure,
                property_build_year,
                property_floor_level,
                property_furnishing,
                property_keyword,
                property_name,
            } = req.body;

            let property_images = [];

            // for (let i = 0; i < req.files.length; i++) {
            //     property_images.push(req.files[i].path);
            // }

            const propertyData = {
                property_propertySchema: {
                    property_location,
                    property_type,
                    property_new_project,
                    property_price,
                    property_bedroom,
                    property_floor_size,
                    property_PSF,
                    property_bathroom,
                    property_tenure,
                    property_build_year,
                    property_floor_level,
                    property_furnishing,
                    property_keyword,
                },
                property_name,
                property_images,
            };
            const { id } = req.params;
            const agent = new AgentEntity();
            await agent.fetchAgentByUserId(id);

            const user = new UserEntity();
            await user.fetchUserById(seller_id);

            const property = new PropertyEntity();
            await property.createProperty(agent.agent._id, propertyData);

            await agent.addToAgentProperty(property);
            await user.addToUserProperty(property);

            res.status(201).json({
                success: true,
                message: "New property",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to create property",
            });
        }
    }

    async patchProperty(req, res) {
        try {
            const { property_id } = req.params;
            const {
                property_location,
                property_type,
                property_new_project,
                property_price,
                property_bedroom,
                property_floor_size,
                property_PSF,
                property_bathroom,
                property_tenure,
                property_build_year,
                property_floor_level,
                property_furnishing,
                property_keyword,
                property_name,
                property_existing_images,
            } = req.body;

            const property = new PropertyEntity();
            await property.fetchPropertyById(property_id);

            let property_images = [];
            let removedImage = [];

            const existing_images = property_existing_images.split(",");

            if (existing_images.length > 0 && existing_images[0] !== "") {
                for (let i = 0; i < existing_images.length; i++) {
                    property_images.push(existing_images[i]);
                }

                removedImage = property.property.property_images.filter(
                    (image) => !existing_images.includes(image)
                );
            }

            if (removedImage.length > 0) {
                for (let i = 0; i < removedImage.length; i++) {
                    fs.unlink(removedImage[i], (err) => {
                        // console.log(err);
                    });
                }
            }

            if (req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    property_images.push(req.files[i].path);
                }
            }

            const propertyData = {
                property_propertySchema: {
                    property_location,
                    property_type,
                    property_new_project,
                    property_price,
                    property_bedroom,
                    property_floor_size,
                    property_PSF,
                    property_bathroom,
                    property_tenure,
                    property_build_year,
                    property_floor_level,
                    property_furnishing,
                    property_keyword,
                },
                property_name,
                property_images: property_images,
            };

            property.updateProperty(property_id, propertyData);

            res.status(201).json({
                success: true,
                message: "Property updated",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to update property",
            });
        }
    }

    async deleteProperty(req, res) {
        const { property_id } = req.params;
        const property = new PropertyEntity();
        await property.fetchPropertyById(property_id);

        for (let i = 0; i < property.property.property_images.length; i++) {
            fs.unlink(property.property.property_images[i], (err) => {
                //  console.log(err);
            });
        }

        property.deleteProperty(property_id);

        try {
            res.status(201).json({
                success: true,
                message: "Property Deleted",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to delete property",
            });
        }
    }
}

module.exports = AgentController;
