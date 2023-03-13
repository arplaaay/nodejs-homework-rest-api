const { User } = require("../../models/users");

const userVerifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const findUser = await User.findOne({ verificationToken });

  if (!findUser) {
    res.json({ message: "User not found!" });
  }

  await User.findByIdAndUpdate(findUser._id, { verify: true, verificationToken: "" });

  res.json({ message: "Congratulations! You have successfully verified your email!" });
};

module.exports = userVerifyEmail;
