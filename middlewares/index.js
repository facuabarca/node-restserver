const fieldValidator = require("../middlewares/fields-validator");
const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
  ...validateJWT,
  ...fieldValidator,
  ...validateRoles
}