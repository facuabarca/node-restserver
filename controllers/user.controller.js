const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const UserModel = require("../models/user");

const getUser = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [count, users] = await Promise.all([
    UserModel.countDocuments(),
    UserModel.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    count,
    users,
  });
};

const postUser = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new UserModel({ name, email, password, role });
  // console.log(user);
  // Encrypt password
  const salt = bcryptjs.genSaltSync(10); // Default value.
  user.password = bcryptjs.hashSync(user.password, salt);

  await user.save();

  res.status(200).json({
    user,
  });
};

const putUser = async (req, res = response) => {
  const id = req.params.id;

  const { _id, password, google, email, ...userData } = req.body;

  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync(10); // Default value.
    userData.password = bcryptjs.hashSync(password, salt);
  }

  const user = await UserModel.findByIdAndUpdate(id, userData);

  res.status(200).json({
    user,
  });
};

const patchUser = (req, res = response) => {
  res.status(200).json({
    msg: "patch API - controller",
  });
};

const deleteUser = async(req, res = response) => {
  const id = req.params.id;
  const user = await UserModel.findByIdAndUpdate( id, { status : false }); 
  res.status(200).json({
    user
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
};
