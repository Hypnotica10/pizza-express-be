import { StatusCodes } from "http-status-codes";
import { productService } from "~/services/productService";
import { formatResponse } from "~/utils/formatResponse";

const createNew = async (req, res, next) => {
    try {
        const createdProduct = await productService.createNew(req.body);
        const response = formatResponse(StatusCodes.CREATED, "success", 'Create product success!', createdProduct);
        res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
        next(error);
    }
}

const getByCategoryId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listProducts = await productService.getByCategoryId(id);
        const response = formatResponse(StatusCodes.OK, "success", 'Get products by category ID success!', listProducts);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
}

const updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.updateById(id, req.body);
        const response = formatResponse(StatusCodes.OK, "success", 'Update product success!', updatedProduct);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.deleteById(id);
        const response = formatResponse(StatusCodes.OK, "success", 'Delete product success!', updatedProduct);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
}

export const productController = {
    createNew,
    getByCategoryId,
    updateById,
    deleteById
}