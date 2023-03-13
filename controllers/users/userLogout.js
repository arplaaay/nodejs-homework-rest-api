const { User } = require("../../models/users");

const userLogout = async (req, res) => {
  const { _id } = req.user;

  await User.findOneAndUpdate(_id, { token: "" });
  res.json({ message: "Logout success" });
};

module.exports = userLogout;
