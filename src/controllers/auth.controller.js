const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signUp(request, response) {
  const { firstName, lastName, email, userName, password } = request.body;
  const user = new User({
    firstName,
    lastName,
    email,
    userName,
    password: bcrypt.hashSync(password, 15),
  });
  const saveUser = await user.save().catch((err) => {
    response.status(500).send({
      message: err,
    });
    return;
  });
  response.send({
    message: "user was registered correctly",
  });
}
async function signIn(request, response) {
  const { userName, password } = request.body;
  const user = await User.findOne({
    userName,
  }).catch((err) => {
    response.status(500).send({
      message: err,
    });
    return;
  });
  if (!user) {
    return response.status(401).send({
      accessToken: null,
      message: "invalid user or password",
    });
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return response.status(401).send({
      accessToken: null,
      message: "invalid user or password",
    });
  }     
  const secret = process.env.TOKEN_SECRET || "this is a secret phrase"
  const token = jwt.sign(
    {
      id: user.id,
    },
    secret,
    {
      expiresIn: 86400,
    }
  );
  response.status(200).send({
    id: user.id,
    userName: user.userName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    accessToken: token,
  });
}
module.exports = {signIn, signUp}