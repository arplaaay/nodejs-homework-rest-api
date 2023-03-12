const jwt = require("jsonwebtoken");

const { User } = require("../models/users");

const { JWT_SECRET } = process.env;

const checkToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return res.json({ message: "Not authorized!" });
  }

  try {
    const { _id } = jwt.verify(token, JWT_SECRET);

    const findUser = await User.findById({ _id });

    if (!findUser || !findUser.token) {
      return res.json({ message: "Not authorized!" });
    }

    req.user = findUser;

    next();
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = checkToken;
