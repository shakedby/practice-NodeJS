const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Shaked",
    email: "shaked@raz.com",
    password: "love",
  },
];
const getUsers = (req, res, next) => {
  //   const userId = req.params.pid;==>for return userbyid
  //   const user = DUMMY_USERS.find((p) => {
  //     return p.id === userId;
  //   });
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //console.log(errors);
    throw new HttpError("invalid inputs", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((p) => p.email === email);
  if (hasUser) {
    throw new HttpError("email already exists", 422);
  }

  const newUserCreated = {
    id: uuid.v4(), //get some randomaly id
    name,
    email,
    password,
  };
  DUMMY_USERS.push(newUserCreated);
  res.status(201).json({ user: newUserCreated });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const idenUser = DUMMY_USERS.find((p) => p.email === email);
  if (!idenUser || idenUser.password !== password) {
    throw new HttpError("could not identify user", 401);
  }
  res.json({ messgage: "Logged in!" });
  //   DUMMY_USERS.map((index, array) => {
  //     if (email === index.email || password === index.password) {
  //       res.json({ message: "invalid !" });
  //     }
  //   });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
