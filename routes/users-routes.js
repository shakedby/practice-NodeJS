var express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/users-contrillers");
var router = express.Router();

router.get("/getusers", userController.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isLength({ min: 6 }),
  ],
  userController.signup
);

router.post("/login", userController.login);

module.exports = router;
