const Validator = require('validatorjs');
const { sendResponse } = require('../utils/response');

const validate = (rules) => (req, res, next) => {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
        return sendResponse(res, 400, false, 'Validation errors', null, validation.errors.all());
    }
    next();
};

module.exports = validate;
