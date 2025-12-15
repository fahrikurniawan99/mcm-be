const sendResponse = (res, statusCode, success, message, data = null, errors = null) => {
    const response = {
        success,
        message,
        data,
        errors
    };
    res.status(statusCode).json(response);
}

module.exports = { sendResponse };