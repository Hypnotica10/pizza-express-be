import Joi from 'joi';
import mongoose from 'mongoose';


const CATEGORY_COLLECTION_NAME = "categories";
export const CATEGORY_SCHEMA = Joi.object({
    // id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string().required().trim().strict(),
    slug: Joi.string().required().trim().strict(),
    description: Joi.string().required().trim().strict(),
    image: Joi.string().required().trim().strict(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    isDeleted: Joi.boolean().default(false),
    discardedAt: Joi.date().timestamp('javascript').default(null)
});
const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    slug: String,
    createdAt: Number,
    updatedAt: Number,
    isDeleted: Boolean,
    discardedAt: Number
}, {
    versionKey: false
});

export const Category = mongoose.model(CATEGORY_COLLECTION_NAME, categorySchema);