const { Contact } = require("../models/contacts");

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    res.json({ message: "Not found!" });
  }

  res.json({ message: "Contact successfully deleted!" });
};

module.exports = deleteContactById;
