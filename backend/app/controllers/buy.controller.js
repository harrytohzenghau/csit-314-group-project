const PropertyEntity = require("../entities/property.entity");

class BuyController {
    async getAllProperties(req, res) {
        try {
            const property = new PropertyEntity();
            await property.fetchAllProperty();

            res.status(201).json({
                success: true,
                message: "Properties Found",
                properties: property.allProperty,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "No Property Found",
            });
        }
    }

    async getProperty(req, res) {
        try {
            const { id } = req.params;
            const property = new PropertyEntity();
            await property.fetchPropertyById(id);

            res.status(201).json({
                success: true,
                message: "Property Found",
                property: property.property,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "No property Found",
            });
        }
    }
}

module.exports = BuyController;
