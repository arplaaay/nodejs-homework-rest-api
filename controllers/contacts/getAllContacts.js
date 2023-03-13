const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, null, { skip, limit: Number(limit) }).populate("owner");

  res.json(result);
};

module.exports = getAllContacts;
