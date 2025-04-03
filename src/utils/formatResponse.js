export const formatResponse = (statusCodes, status, message, data) => {
    if (status === "success") {
        return {
            code: statusCodes,
            status: status,
            message: message,
            data: data
        }
    }
    return {
        code: statusCodes,
        status: status,
        message: message
    }
}