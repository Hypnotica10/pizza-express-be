import { StatusCodes } from "http-status-codes";
import { Category, CATEGORY_SCHEMA } from "~/models/category";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";

const validateBeforeCreate = async (data) => {
    return await CATEGORY_SCHEMA.validateAsync(data, { abortEarly: false });
}

const checkIdExists = async (id) => {
    const isExists = await Category.find({ _id: id, isDeleted: false }).countDocuments();
    return isExists;
}

const createNew = async (data) => {
    const newCategory = {
        ...data,
        slug: slugify(data.name)
    };

    const validData = await validateBeforeCreate(newCategory);
    const savedCategory = await Category.create(validData);
    return savedCategory;
}

const getAll = async () => {
    const listCategories = await Category.find({ isDeleted: false });
    return listCategories;
}

const updateById = async (id, data) => {
    const isExists = await checkIdExists(id);
    if (!isExists) throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid ID or ID does not exist!');
    const updateData = {
        ...data,
        slug: slugify(data.name),
        updatedAt: Date.now()
    };
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
    return updatedCategory;
}


const deleteById = async (id) => {
    const isExists = await checkIdExists(id);
    if (!isExists) throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid ID or ID does not exist!');
    const deletedCategory = await Category.findByIdAndUpdate(id, { isDeleted: true, discardedAt: Date.now() }, { new: true });
    return deletedCategory;
}

export const categoryService = {
    createNew,
    getAll,
    updateById,
    checkIdExists,
    deleteById
}