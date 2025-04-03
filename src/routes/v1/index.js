import express from 'express';
import { categoryRouter } from './categoryRoute';

const Router = express.Router();

Router.use('/category', (req, res, next) => {
    // Handle Method Not Allowed
    // const routes = [];

    // categoryRouter.stack.forEach((layer) => {
    //     if (layer.route) {
    //         const methods = Object.keys(layer.route.methods).map((method) => method.toUpperCase());
    //         routes.push({ path: layer.route.path, methods });
    //     }
    // });

    next();
}, categoryRouter);

export const APIs_V1 = Router;
