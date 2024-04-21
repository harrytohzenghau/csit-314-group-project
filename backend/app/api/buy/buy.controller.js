const BuyEntity = require("./buy.entity");

class BuyController {
    async findHomes(req, res) {
        try {
            const buy = new BuyEntity();
            const { params } = req;
            const allListings = await buy.findListings(params);

            res.status(201).json({
                success: true,
                message: "Listings Found",
                allListings,
            });
        } catch (error) {
            res.status(500).json({
                error,
                message: "No listings Found",
            });
        }
    }
}

module.exports = BuyController;
