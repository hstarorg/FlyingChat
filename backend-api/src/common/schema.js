const Joi = require('joi');

module.exports = {
  Joi,
  rules: {
    stringRequired: Joi.string().required(),
    stringAllowEmpty: Joi.string().allow(''),
    stringIn(...values) {
      return Joi.string().valid(...values);
    }
  },
};
