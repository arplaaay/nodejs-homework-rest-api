const { Contact } = require("../../models/contacts");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    res.json({ message: "Not found!" });
  }

  res.json(result);
};

module.exports = getContactById;
