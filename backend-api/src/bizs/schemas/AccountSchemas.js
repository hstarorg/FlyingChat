const { schema: { Joi, rules } } = require('../../common');

const BASE_SCHEMA = {
  userName: Joi.string()
    .min(4)
    .max(30)
    .required(),
  password: Joi.string()
    .min(4)
    .max(30)
    .required()
};

module.exports = {
  LOGIN_SCHEMA: Object.assign({}, BASE_SCHEMA),
  REGISTER_SCHEMA: Object.assign({ nickName: rules.stringRequired }, BASE_SCHEMA)
};
