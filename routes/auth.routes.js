const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { fieldValidator } = require("../middlewares/fields-validator");

const router = Router();

router.post("/login", [ 
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  fieldValidator
], login);


module.exports = router;