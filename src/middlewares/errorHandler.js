import { StatusCodes } from 'http-status-codes'
import { formatResponse } from '~/utils/formatResponse'

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const logError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }
  console.error(logError)

  const response = formatResponse(err.statusCode, "error", err.message);

  // if (env.BUILD_MODE !== 'dev') delete responseError.stack

  res.status(err.statusCode).json(response)
}