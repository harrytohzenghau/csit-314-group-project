const PropertyEntity = require("./property.entity");
// const AdminClass = require("../../class/admin.class");

class PropertyController {
    async viewAllProperties(req, res) {
        try {
            const property = new PropertyEntity();
            const allProperties = await property.getAllProperties();

            res.status(201).json({
                success: true,
                message: "All properties fetched",
                allProperties,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to fetch properties",
            });
        }
    }

    async newProperty(req, res) {
        try {
            const property = new PropertyEntity();
            await property.createProperty(req.body);

            res.status(201).json({
                success: true,
                message: "Created new property",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to create new property",
            });
        }
    }

    async updateProperty(req, res) {
        try {
            const property = new PropertyEntity();
            await property.findByIdAndUpdate(req.body);

            res.status(201).json({
                success: true,
                message: "property updated",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error,
                message: "Failed to update property",
            });
        }
    }

    async deleteProperty(req, res) {
        try {
            const property = new PropertyEntity();
            await property.findByIdAndDelete(req.body);

            res.status(201).json({
                success: true,
                message: "Property deleted",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "Failed to delete property",
            });
        }
    }
}

module.exports = PropertyController;
