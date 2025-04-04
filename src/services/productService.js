import ApiError from "~/utils/ApiError";
import { categoryService } from "./categoryService";
import { StatusCodes } from "http-status-codes";
import { slugify } from "~/utils/formatters";
import { Product, PRODUCT_SCHEMA } from "~/models/product";

const validateBeforeCreate = async (data) => {
    return await PRODUCT_SCHEMA.validateAsync(data, { abortEarly: false });
}

const checkIdExists = async (id) => {
    const isExists = await Product.find({ _id: id, isDeleted: false }).countDocuments();
    return isExists;
}

const createNew = async (data) => {
    const { categoryId } = data;
    const isCategoryExists = categoryService.checkIdExists(categoryId);
    if (!isCategoryExists) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid category ID!');
    }
    const newProduct = {
        ...data,
        slug: slugify(data.name)
    };

    const validData = await validateBeforeCreate(newProduct);
    const savedProduct = await Product.create(validData);
    return savedProduct;
}

const getByCategoryId = async (categoryId) => {
    const isCategoryExists = await categoryService.checkIdExists(categoryId);
    if (!isCategoryExists) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid category ID!');
    }
    const listProducts = await Product.find({ categoryId, isDeleted: false });
    return listProducts;
}

const updateById = async (id, data) => {
    const isValidId = await checkIdExists(id);
    if (!isValidId) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid ID or ID does not exist!');
    }
    const { categoryId } = data;
    const isCategoryExists = categoryService.checkIdExists(categoryId);
    if (!isCategoryExists) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid category ID!');
    }
    const updateData = {
        ...data,
        slug: slugify(data.name),
        updatedAt: Date.now()
    };
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    return updatedProduct;
}

const deleteById = async (id) => {
    const isValidId = await checkIdExists(id);
    if (!isValidId) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid ID or ID does not exist!');
    }
    const deletedProduct = await Product.findByIdAndUpdate(id, { isDeleted: true, discardedAt: Date.now() }, { new: true });
    return deletedProduct;
}

export const productService = {
    createNew,
    getByCategoryId,
    checkIdExists,
    updateById,
    deleteById
}