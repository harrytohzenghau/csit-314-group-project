class BuyController {
    async getAllHomes(req, res) {
        try {
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
