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

    async fetchAllProperty() {
        this.allProperty = await Property.find();
        return;
    }
    async fetchProperty() {
        const { property_type, property_bedroom, property_name } = params;

        this.allProperty = await Property.find({
            property_name,
            "property_propertySchema.property_type": property_type || "",
            "property_propertySchema.property_bedroom": property_bedroom || "",
        });
    }

    async createProperty(id, data) {
        this.property = new Property(data);
        this.property.property_agentSchema = id;
        await this.property.save();

        return;
    }

    async updateProperty(id, data) {
        console.log(id);

        console.log(data);

        return;
    }
}

module.exports = PropertyEntity;
