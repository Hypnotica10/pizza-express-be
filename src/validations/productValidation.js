import { StatusCodes } from "http-status-codes";
import Joi from "joi"
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE } from "~/utils/validators"

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        name: Joi.string().required().trim().strict().messages({
            'any.required': 'Name is required',
            'string.empty': 'Name cannot be an empty field'
        }),
        description: Joi.string().required().trim().strict().messages({
            'any.required': 'Description is required',
            'string.empty': 'Description cannot be an empty field'
        }),
        image: Joi.string().required().trim().strict().messages({
            'any.required': 'Image is required',
            'string.empty': 'Image cannot be an empty field'
        }),
        categoryId: Joi.string().required().pattern(OBJECT_ID_RULE).messages({
            'any.required': 'Category ID is required',
            'string.empty': 'Category ID cannot be an empty field',
            'string.pattern.name': 'Category ID invalid'
        })
    })
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        // Validate dữ liệu xong đẩy sang controller xử lý tiếp
        next();
    } catch (error) {
        const errorMessage = new Error(error).message;
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage));

    }
}

const updateProduct = async (req, res, next) => {
    const correctCondition = Joi.object({
        name: Joi.string().trim().strict(),
        description: Joi.string().trim().strict(),
        image: Joi.string().trim().strict(),
        categoryId: Joi.string().pattern(OBJECT_ID_RULE).messages({
            'string.pattern.name': 'Category ID invalid'
        })
    })
    try {
        // Validate các fields còn lại
        await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
        // Validate dữ liệu xong đẩy sang controller xử lý tiếp
        next();
    } catch (error) {
        const errorMessage = new Error(error).message;
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage));

    }
}

export const productValidation = {
    createNew,
    updateProduct
}