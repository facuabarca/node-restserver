const { response, request } = require("express");
const UserModel = require('../models/user');
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {
  const { email, password } = req.body;

  try {

    // Check if email exists.
    const user = await UserModel.findOne({ email });


    if (!user) {
      return res.status(400).json({
        msg: "User / Password don't exists"
      })
    }

    // Check if user is active
    if (!user.status) {
      return res.status(400).json({
        msg: "User / Password don't exists: state-false"
      })
    }
    // Verify password

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password don't exists: password"
      })
    }

    // Generate JWT
    const token = await generateJWT( user.id);

    res.json({
      msg: "login ok",
      user,
      token
    });
    
  } catch (error) {
    console.log(eror);
    res.status(500).json({
      msg: "Error",
    });
  }
};

module.exports = {
  login,
};
