const userRegister = require("./userRegister");
const userLogin = require("./userLogin");
const userLogout = require("./userLogout");
const currentUser = require("./currentUser");
const userAvatar = require("./userAvatar");
const userVerifyEmail = require("./userVerifyEmail");
const userResendVerifyEmail = require("./userResendVerifyEmail");

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  currentUser,
  userAvatar,
  userVerifyEmail,
  userResendVerifyEmail,
};
