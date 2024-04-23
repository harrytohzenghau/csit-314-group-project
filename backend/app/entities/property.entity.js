const Listing = require("../schemas/Listing.schema");

class ListingClass {
    allListings = [];

    get allListings() {
        return this.allListings;
    }

    async getAllListings(params) {
        const { property_type, property_bedroom, listing_name } = params;

        allListings = await Listing.find({
            listing_name,
            "listing_propertySchema.property_type": property_type,
            "listing_propertySchema.property_bedroom": property_bedroom,
        });
    }
    async createListing(data) {
        const listing = new Listing(data);
        await listing.save();
        return;
    }
    async findByIdAndUpdate(data) {
        const { _id } = data;
        await Listing.findByIdAndUpdate(_id, data);
    }
    async findByIdAndDelete(data) {
        const { _id } = data;
        await Listing.findByIdAndDelete(_id);
    }
}

module.exports = ListingClass;
