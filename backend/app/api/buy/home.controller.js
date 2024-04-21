const HomeEntity = require("./home.entity");

class HomeController {
    async findHomes(req, res) {
        try {
            const home = new HomeEntity();
            const { params } = req;
            const allListings = await home.findListings(params);

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

module.exports = HomeController;
