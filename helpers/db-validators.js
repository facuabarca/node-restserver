const Role = require('../models/role');
const UserModel = require("../models/user");

const isValidRole =  async(role = '') => {
  const rolExists = await Role.findOne({ role });
  if ( !rolExists ) {
    throw new Error(`The role ${role} is not registered in the BD`);
  }
}

const emailExists = async(email = '') => {
  const isUsed = await UserModel.findOne({ email });
  if ( isUsed ) {
    throw new Error(`The email ${email} is registered in the BD`);
  }
}

const userExists = async(id = '') => {
  const exists = await UserModel.findOne({ _id: id });
  if ( !exists ) {
    throw new Error(`The user ${id} is not registered in the BD`);
  }
}

module.exports = {
  isValidRole,
  emailExists,
  userExists
}