import express from 'express';
import { productController } from '~/controllers/productController';
import { checkIdValid, methodNotAllowed } from '~/middlewares/globalError';
import { productValidation } from '~/validations/productValidation';

export const productRouter = express.Router();

productRouter.route("/")
    .post(productValidation.createNew, productController.createNew)
    .all(methodNotAllowed)

productRouter.route("/:id")
    .get(checkIdValid, productController.getByCategoryId) // Get all products by category ID
    .put(checkIdValid, productValidation.updateProduct, productController.updateById) // Update product by ID
    .delete(checkIdValid, productController.deleteById) // Delete product by ID
    .all(methodNotAllowed)