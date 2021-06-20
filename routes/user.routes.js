const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/fields-validator");
const {
  isValidRole,
  emailExists,
  userExists,
} = require("../helpers/db-validators");
const {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUser);


router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Email is not valid.").isEmail(),
    check("password", "Min length required is 6 characters").isLength({
      min: 6,
    }),
    check("role").custom(isValidRole),
    check("email").custom(emailExists),
    fieldValidator,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "Id is not valid.").isMongoId(),
    check("id").custom(userExists),
    check("role").custom(isValidRole),
    fieldValidator,
  ],
  putUser
);

router.patch("/", patchUser);
router.delete("/:id", [
  check("id", "Id is not valid.").isMongoId(),
  check("id").custom(userExists),
  fieldValidator
], deleteUser);

module.exports = router;
