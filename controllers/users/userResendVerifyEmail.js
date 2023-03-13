const { User } = require("../../models/users");

const sendEmail = require("../../helpers/sendEmail");

const userResendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const findUser = User.findOne({ email });

  if (!findUser) {
    return res.json({ message: "User not found" });
  }

  if (!findUser.verify) {
    return res.json({ message: `This user has already been verified!` });
  }

  const msg = {
    to: email,
    subject: "Confirm your registration!",
    html: `<a href="http://localhost:3000/api/users/verify/${findUser.verificationToken}" target="_blank">Click on this link to verify your email</a>`,
  };

  await sendEmail(msg);

  res.json({ message: "A second link to verify your email has been sent" });
};

module.exports = userResendVerifyEmail;
