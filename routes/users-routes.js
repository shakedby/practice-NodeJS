var express = require("express");
const userController = require("../controllers/users-contrillers");
var router = express.Router();

router.get("/getusers", userController.getUsers);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

module.exports = router;
