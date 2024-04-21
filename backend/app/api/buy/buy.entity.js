const ListingClass = require("../../class/listing.class");

class BuyEntity {
    async findListings(params) {
        const listing = new ListingClass();
        await listing.getAllListings(params);

        return listing.allListings;
    }
}

module.exports = BuyEntity;
