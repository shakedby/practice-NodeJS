const DUMMY_USERS = [
  {
    id: "u1",
    name: "Shaked",
    email: "shaked@raz.com",
    password: "love",
  },
];
const getUsers = (req, res, next) => {
  const userId = req.params.id;
  const user = DUMMY_USERS.find((p) => {
    return p.id === userId;
  });
  res.status(200).json({ user });
};

const signup = (req, res, next) => {};

const login = (req, res, next) => {};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
