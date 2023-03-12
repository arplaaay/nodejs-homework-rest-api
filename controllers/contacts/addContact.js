const { Contact } = require("../../models/contacts");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });

  res.json(result);
};

module.exports = addContact;
