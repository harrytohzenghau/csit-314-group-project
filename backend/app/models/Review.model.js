const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
    {
        rating_service_quality: {
            type: Number,
            required: true,
            default: 5,
        },
        rating_knowledge_expertise: {
            type: Number,
            required: true,
            default: 5,
        },
        rating_marketing_negotiation: {
            type: Number,
            required: true,
            default: 5,
        },
        rating_reliability: {
            type: Number,
            required: true,
            default: 5,
        },
        rating_overall: {
            type: Number,
            required: true,
            default: 5,
        },
        rating_feedback: {
            type: String,
            required: true,
            default: "This is Default",
        },
        rating_pov: {
            type: String,
            enum: ["Buyer", "Seller"],
            required: true,
            default: "Buyer",
        },
    },
    { _id: False }
);

const reviewSchema = new Schema(
    {
        review_rating: ratingSchema,
        review_agent_reply: {
            type: String,
            required: true,
            default: "This is a Reply",
        },
        review_deleted: {
            type: Boolean,
            required: true,
            default: False,
        },
        review_created: {
            type: Date,
            required: true,
            default: new Date(),
        },
        review_edited: {
            type: Date,
            required: true,
            default: new Date(),
        },
    },
    { minimize: false }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
