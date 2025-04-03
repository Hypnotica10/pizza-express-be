import Joi from "joi";
import mongoose from "mongoose";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const PRODUCT_COLLECTION_NAME = "products";
export const PRODUCT_SCHEMA = Joi.object({
    name: Joi.string().required().trim().strict(),
    slug: Joi.string().required().trim().strict(),
    description: Joi.string().required().trim().strict(),
    image: Joi.string().required().trim().strict(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    categoryId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    createdAt: Joi.date().timestamp("javascript").default(Date.now),
    updatedAt: Joi.date().timestamp("javascript").default(null),
    isDeleted: Joi.boolean().default(false),
    discardedAt: Joi.date().timestamp("javascript").default(null),
});

const productSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        image: String,
        slug: String,
        price: Number,
        quantity: Number,
        categoryId: {
            types: mongoose.Schema.Types.ObjectId,
            ref: "categories"
        },
        createdAt: Number,
        updatedAt: Number,
        isDeleted: Boolean,
        discardedAt: Number
    },
    {
        versionKey: false
    }
);

export const Product = mongoose.model(PRODUCT_COLLECTION_NAME, productSchema);