const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
});

const loginSchema = Joi.object({
  // eslint-disable-next-line prefer-regex-literals
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  subscription: Joi.string(),
  avatarURL: Joi.string(),
  token: Joi.string(),
});

const registerSchema = Joi.object({
  // eslint-disable-next-line prefer-regex-literals
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  subscription: Joi.string(),
  token: Joi.string(),
});

const schemas = {
  loginSchema,
  registerSchema,
};

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
  schemas,
};
