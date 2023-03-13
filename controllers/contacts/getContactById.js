const { Contact } = require("../../models/contacts");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOne({ _id: contactId, owner });

  if (!result) {
    res.json({ message: "Not found!" });
  }

  res.json(result);
};

module.exports = getContactById;
