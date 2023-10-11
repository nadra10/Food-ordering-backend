const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.create = async function (req, res) {
  try {
    const user = await User.create(req.body);

    const token = createJWT(user);

    res.json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch {
    res.status(400).json("Bad Credentials");
  }
};

exports.checkToken = function (req, res) {
  console.log("req.user", req.user);
  console.log({ exp: req.exp });
  res.json(req.exp);
};