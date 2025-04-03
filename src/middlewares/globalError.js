import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE } from "~/utils/validators";

// Handle Method Not Allowed
export const methodNotAllowed = (req, res, next) => {
    next(new ApiError(StatusCodes.METHOD_NOT_ALLOWED, 'Method Not Allowed!'));
}

// Handle No Resource Found
export const noResourceFound = (req, res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND, 'Resource Not Found!'));
}

// Handle invalid id khi update hoặc delete
export const checkIdValid = (req, res, next) => {
    const { id } = req.params;
    const isValidId = id.match(OBJECT_ID_RULE);
    if (!isValidId) {
        next(new ApiError(StatusCodes.BAD_REQUEST, 'Invalid ID or ID does not exist!'));
    }
    next();
}