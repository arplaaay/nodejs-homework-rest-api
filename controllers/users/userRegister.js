const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models/users");

const userRegister = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser) {
    return res.json({ message: "The email you entered is already in use!" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const createUser = await User.create({ email, password: hashPassword, avatarURL });

  res.json({ email: `User ${createUser.email} successfully created!` });
};

module.exports = userRegister;
