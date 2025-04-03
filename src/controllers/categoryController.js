import { StatusCodes } from "http-status-codes";
import { categoryService } from "~/services/categoryService";
import ApiError from "~/utils/ApiError";
import { formatResponse } from "~/utils/formatResponse";

const createNew = async (req, res, next) => {
    try {
        const createdCategory = await categoryService.createNew(req.body);
        const response = formatResponse(StatusCodes.CREATED, "success", 'Create category success!', createdCategory);
        res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const listCategories = await categoryService.getAll();
        const response = formatResponse(StatusCodes.OK, "success", 'Get all categories success!', listCategories);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
}

const checkCategoryExists = async (id) => {
    const isExists = await categoryService.checkIdExists(id);
    if (!isExists) {
        return false;
    }
    return true;
}

const updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isValidId = await checkCategoryExists(id);
        if (!isValidId) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid ID or ID does not exist!');
        }
        const updatedCategory = await categoryService.updateById(id, req.body);
        const response = formatResponse(StatusCodes.OK, "success", 'Update category success!', updatedCategory);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isValidId = await checkCategoryExists(id);
        if (!isValidId) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid ID or ID does not exist!');
        }
        const updatedCategory = await categoryService.deleteById(id);
        const response = formatResponse(StatusCodes.OK, "success", 'Delete category success!', updatedCategory);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
}


export const categoryController = {
    createNew,
    updateById,
    getAll,
    deleteById
}