const { response, request } = require("express");

const getUser = (req = request, res = response) => {

  const params = req.query;
  res.status(200).json({
    msg: "put API - controller",
    params
  });
};

const postUser = (req, res = response) => {

  const { nombre, edad } = req.body;

  res.status(200).json({
    msg: "post API - controller",
    nombre,
    edad
  });
};

const putUser = (req, res = response) => {

  const id = req.params.id;
  res.status(200).json({
    msg: "put API - controller",
    id
  });
};

const patchUser = (req, res = response) => {
  res.status(200).json({
    msg: "patch API - controller",
  });
};

const deleteUser = (req, res = response) => {
  res.status(200).json({
    msg: "delete API - controller",
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser
};
