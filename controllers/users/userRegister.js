const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/users");
const sendEmail = require("../../helpers/sendEmail");

const userRegister = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser) {
    return res.json({ message: "The email you entered is already in use!" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const createUser = await User.create({ email, password: hashPassword, avatarURL, verificationToken });

  const msg = {
    to: email,
    subject: "Confirm your registration!",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click on this link to verify your email</a>`,
  };

  await sendEmail(msg);

  res.json({ email: `User ${createUser.email} successfully created! Verify your email before you log in!` });
};

module.exports = userRegister;
