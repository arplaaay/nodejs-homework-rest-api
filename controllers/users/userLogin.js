const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/users");

const { JWT_SECRET } = process.env;

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    return res.json({ message: "Invalid email or password" });
  }

  if (!(await bcrypt.compare(password, findUser.password))) {
    return res.json({ message: "Invalid email or password" });
  }

  const payload = {
    _id: findUser._id,
  };

  const jwtToken = jwt.sign(payload, JWT_SECRET);

  await User.findByIdAndUpdate(findUser._id, { token: jwtToken });

  res.json({ message: "You have successfully logged in!", token: jwtToken });
};

module.exports = userLogin;
