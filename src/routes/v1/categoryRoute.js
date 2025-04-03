import express from 'express';
import { categoryValidation } from '~/validations/categoryValidation';
import { categoryController } from '~/controllers/categoryController';
import { checkIdValid, methodNotAllowed } from '~/middlewares/globalError';

export const categoryRouter = express.Router();

categoryRouter.route('/')
    .get(categoryController.getAll)
    .post(categoryValidation.createNew, categoryController.createNew)
    .all(methodNotAllowed)

categoryRouter.route('/:id')
    .put(checkIdValid, categoryValidation.updateCategory, categoryController.updateById)
    .delete(checkIdValid, categoryController.deleteById)
    .all(methodNotAllowed)