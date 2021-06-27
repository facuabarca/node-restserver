const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

  const token = req.header('x-token');
  
  if (!token) {
    return res.status(401).json({
      msg: 'Token is missing'
    });
  }

  try {

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const userAuthenticated = await UserModel.findById(uid);

    if( !userAuthenticated) {
      return res.status(401).json({
        msg: 'Token not valid'
      });
    }

    if (!userAuthenticated.status) {
      return res.status(401).json({
        msg: 'Token not valid'
      });
    }



    req.userAuthenticated  = userAuthenticated;

    next();
    
  } catch (err) {

    console.log(err);
    return res.status(401).json({
      msg: 'Token not valid'
    });
    
  }


}

module.exports = {
  validateJWT
}