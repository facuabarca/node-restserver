const { response } = require("express");


const isAdminRole = (req, res = response, next)  => {

  if (!req.userAuthenticated) {
    return res.status(500).json({
      msg: 'Token invalid for UserAuthenticated.'
    });
  }

  const { role, name } = req.userAuthenticated;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not admin.`
    });
  }

  next();
}

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    
    
    if (!req.userAuthenticated) {
      return res.status(500).json({
        msg: 'Token invalid for UserAuthenticated.'
      });
    }
    
    
    const { role } = req.userAuthenticated;
    
    if(!roles.includes(role)) {
      return res.status(401).json({
        msg: `The service required one of this roles ${roles}`
      })
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole
}