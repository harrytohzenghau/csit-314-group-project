const PropertyEntity = require("../entities/property.entity");

class BuyController {
    async getAllProperties(req, res) {
        try {
            const property = new PropertyEntity();
            await property.fetchAllProperty(req.query);

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

    async addOneView(req, res) {
        try {
            const { id } = req.params;
            const property = new PropertyEntity();
            await property.fetchPropertyById(id);
            await property.increaseViewCount();

            res.status(201).json({
                success: true,
                message: "View Increased",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "View Decreased",
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

    async postFavourite(req, res) {
        try {
            const property = new PropertyEntity();
            await property.favouriteProperty(req.body);

            res.status(201).json({
                success: true,
                message: "Property favourited",
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "No property Found",
            });
        }
    }

    async postLike(req, res) {
        try {
            const property = new PropertyEntity();
            await property.likeProperty(req.body);

            res.status(201).json({
                success: true,
                message: "Property favourited",
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
