const Property = require("../schemas/Property.schema");

class PropertyEntity {
    allProperty = [];
    property = {};

    get propertyId() {
        return this.property._id;
    }

    get allProperty() {
        return this.allProperty;
    }

    // async fetchPropertyByAgentId(id) {
    //     this.allProperty = await Property.find({ property_agentSchema: id });
    //     return;
    // }

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
        } = data;

        this.allProperty = await Property.find({
            property_name: { $regex: property_name || "", $options: "i" },
            property_price: {
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
        });

        return;
    }

    async createProperty(agent_id, data) {
        this.property = new Property(data);
        this.property.property_agentSchema = agent_id;
        await this.property.save();

        return;
    }

    async updateProperty(property_id, data) {
        await this.fetchPropertyById(property_id);
        this.property.property_propertySchema = data.property_propertySchema;
        this.property.property_name = data.property_name;
        await this.property.save();
        return;
    }

    async deleteProperty(property_id) {
        this.property = await Property.findById(property_id).populate(
            "property_agentSchema"
        );
        const allAgentProperties =
            this.property.property_agentSchema.agent_properties;

        const remainingAgentProperties = allAgentProperties.filter(
            (e) => e != property_id
        );

        this.property.property_agentSchema.agent_properties =
            remainingAgentProperties;

        await this.property.property_agentSchema.save();
        await Property.findByIdAndDelete(property_id);
        return;
    }
}

module.exports = PropertyEntity;
