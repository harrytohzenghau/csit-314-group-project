const Property = require("../schemas/Property.schema");
const User = require("../schemas/User.schema");

class PropertyEntity {
    allProperty = [];
    property = {};

    get propertyId() {
        return this.property._id;
    }

    get allProperty() {
        return this.allProperty;
    }

    async fetchPropertyById(id) {
        this.property = await Property.findById(id).populate({
            path: "property_agentSchema",
            populate: {
                path: "agent_userSchema",
            },
        });
        return;
    }

    async increaseViewCount() {
        this.property.property_views += 1;
        await this.property.save();
    }

    async fetchAllProperty(data) {
        const {
            property_name,
            property_type,
            property_bedroom,
            price_max,
            price_min,
            sort,
        } = data;

        this.allProperty = await Property.find({
            property_name: { $regex: property_name || "", $options: "i" },
            "property_propertySchema.property_price": {
                $gte: price_min || 0,
                $lte: price_max || 999999999,
            },
            "property_propertySchema.property_type": {
                $regex: property_type || "",
                $options: "i",
            },
            "property_propertySchema.property_bedroom": {
                $regex: property_bedroom || "",
                $options: "i",
            },
        }).sort({ "property_propertySchema.property_price": sort || 1 });

        return;
    }

    async createProperty(agent_id, user_id, data) {
        this.property = new Property(data);
        this.property.property_agentSchema = agent_id;
        this.property.property_userSchema = user_id;
        await this.property.save();

        return;
    }

    async updateProperty(property_id, data) {
        await this.fetchPropertyById(property_id);
        this.property.property_propertySchema = data.property_propertySchema;
        this.property.property_name = data.property_name;
        this.property.property_images = data.property_images;
        await this.property.save();
        return;
    }

    filterOut(property_id, obj) {
        return obj.filter((e) => e != property_id);
    }

    async deleteProperty(property_id) {
        this.property = await Property.findById(property_id)
            .populate("property_agentSchema")
            .populate("property_userSchema");

        const allAgentProperties =
            this.property.property_agentSchema.agent_properties;
        this.property.property_agentSchema.agent_properties = this.filterOut(
            property_id,
            allAgentProperties
        );

        const allUsers = await User.find({
            $or: [
                {
                    user_favourites: property_id,
                },
                {
                    user_likes: property_id,
                },
                {
                    user_agent_properties: property_id,
                },
            ],
        });

        for (const user of allUsers) {
            user.user_favourites = this.filterOut(
                property_id,
                user.user_favourites
            );
            user.user_likes = this.filterOut(property_id, user.user_likes);
            user.user_agent_properties = this.filterOut(
                property_id,
                user.user_agent_properties
            );
            await user.save();
        }

        await this.property.property_agentSchema.save();

        await Property.findByIdAndDelete(property_id);
        return;
    }

    async favouriteProperty(data) {
        const { property_id, user_id, favourite } = data;

        this.user = await User.findById(user_id);
        const property = await Property.findById(property_id);

        if (favourite) {
            this.user.user_favourites.push(property._id);
        } else {
            const favourites = this.user.user_favourites;
            this.user.user_favourites = favourites.filter(
                (fav) => fav.toString() !== property_id
            );
        }

        await this.user.save();

        return;
    }

    async likeProperty(data) {
        const { property_id, user_id, like } = data;

        this.user = await User.findById(user_id);
        const property = await Property.findById(property_id);

        if (like) {
            this.user.user_likes.push(property._id);
            property.property_userLikes.push(this.user._id);
        } else {
            const likes = this.user.user_likes;
            this.user.user_likes = likes.filter(
                (like) => like.toString() !== property_id
            );

            const propLikes = property.property_userLikes;
            property.property_likes = propLikes.filter(
                (prop) => prop.toString() !== user_id
            );
        }

        await this.user.save();
        await property.save();

        return;
    }

    async fetchMostViewed(limit) {
        return await Property.find({}, [], {
            sort: { property_views: -1 },
        }).limit(limit);
    }

    async fetchMostLiked(limit) {
        return await Property.find({}, [], {
            sort: { property_userLikes: -1 },
        }).limit(limit);
    }
}

module.exports = PropertyEntity;
