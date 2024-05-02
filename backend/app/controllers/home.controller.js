const PropertyEntity = require("../entities/property.entity");

class HomeController {
    async getHomes(req, res) {
        try {
            const limit = 1;
            const property = new PropertyEntity();
            const mostViews = await property.fetchMostViewed(limit);
            const mostLiked = await property.fetchMostLiked(limit);

            res.status(201).json({
                success: true,
                message: "Listings Found",
                mostViews,
                mostLiked,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "No listings Found",
            });
        }
    }
}

module.exports = HomeController;
