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

    async createProperty(agent_id, data) {
        this.property = new Property(data);
        this.property.property_agentSchema = agent_id;
        await this.property.save();

        return;
    }

    async updateProperty(property_id, data) {
        await this.fetchPropertyById(property_id);
        this.property.property_propertySchema = data.property_propertySchema;
        this.property.property_name = data.name;
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
