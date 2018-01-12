const { schema: { Joi, rules } } = require('../../common');

module.exports = {
  LOGIN_SCHEMA: {
    userName: rules.stringRequired,
    password: rules.stringRequired
  },
  REGISTER_SCHEMA: {
    userName: rules.stringRequired,
    nickName: rules.stringRequired,
    password: rules.stringRequired
  }
};
