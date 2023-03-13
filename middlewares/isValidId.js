const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  const isCorrectId = isValidObjectId(contactId);

  if (!isCorrectId) {
    return res.json({ message: `${contactId} is correct ID format!` });
  }

  next();
};

module.exports = isValidId;
